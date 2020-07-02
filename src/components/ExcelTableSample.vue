<template>
    <div class="app-container">
        <!-- 查询和其他操作 -->
        <el-button slot="trigger" size="small" type="primary" @click="exportExcel">下载Excel</el-button>
        <el-upload
                class="upload-demo"
                ref="upload"
                :action=uploadUrl()
                :on-success="handleAvatarSuccess"
                :on-change="upload"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                accept=".xlsx"
                :file-list="fileList"
                :auto-upload="false">
            <el-button slot="trigger" size="small" type="success">上传Excel</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传服务器</el-button>
        </el-upload>

        <!-- 查询结果 -->
        <el-table :data="showTableData" id="out-table">
            <el-table-column :formatter="dateFormat" prop="date" label="日期" width="200"></el-table-column>
            <el-table-column prop="name" label="姓名" width="200"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>

<script>
  import FileSaver from "file-saver";
  import XLSX from 'xlsx'
  import moment from 'moment'

  export default {
    name: "ExcelTableSample",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '小二',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '小二',
          address: '上海市普陀区金沙江路 1517 弄'
        }],
        fileList: [],
        //展示用
        showTableData:[],
        //新增用
        addTableData:[],
        //导出excel名称
        exportExcelName: "export-excel.xlsx"
      }
    },
    created() {
      this.showTableData=this.tableData;
    },

    methods: {
      //导出Excel事件
      exportExcel() {
        /* 从表生成工作簿对象 */
        const wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
        /* 获取二进制字符串作为输出 */
        const wbout = XLSX.write(wb, {
          bookType: "xlsx",
          bookSST: true,
          type: "array"
        });
        try {
          FileSaver.saveAs(
            //Blob 对象表示一个不可变、原始数据的类文件对象。
            //Blob 表示的不一定是JavaScript原生格式的数据。
            //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
            //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
            new Blob([wbout], { type: "application/octet-stream" }),
            //设置导出文件名称
            this.exportExcelName
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },

      //上传服务器
      submitUpload () {
        console.info(this.addTableData)
        this.$refs.upload.submit()
      },
      handleAvatarSuccess (response, file, fileList) {
        if (response && response.code === '200') {
          this.$notify.success({
            title: '成功',
            message: '导入成功'})
        }
      },
      //导入Excel事件
      upload (file, fileList) {
        const files = {0: file.raw};
        this.readExcel1(files)
      },
      readExcel1 (files) {
        // console.log(files)
        if (files.length <= 0) {
          return false
        } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
          this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
          return false
        }
        const fileReader = new FileReader();
        fileReader.onload = (ev) => {
          try {
            const data = ev.target.result;
            const workbook = XLSX.read(data, {
              type: 'binary',
              cellDates: true
            });
            const wsname = workbook.SheetNames[0];// 取第一张表
            const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);// 生成json表格内容
            const arr = []
            ws.map(v => {
              const obj = {}
              obj.date = v['日期']
              obj.name = v['姓名']
              obj.address = v['地址']
              arr.push(obj)
            })
            this.showTableData = this.tableData.concat(arr)  //把数据塞到表格预览
            this.addTableData = arr;
          } catch (e) {
            return false
          }
        };
        fileReader.readAsBinaryString(files[0])
      },
      uploadUrl () {
        return process.env.BASE_API + '/upload/importIncomeExcel'
      },
      //时间转换
      dateFormat: function (row, column) {
        const date = row[column.property];
        if (date === undefined) {
          return ''
        }
        return moment(date).format('YYYY-MM-DD')
      },
      handleRemove(file, fileList) {
        this.showTableData=this.tableData;
        console.log(file, fileList);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
    }
  }
</script>
<style lang="stylus">
    .home
        margin-top 50px
    .el-button {
        margin-bottom: 10px;
        margin-left: 10px;
        height:39px;
        width:100px;
    }
    .el-upload {
        margin-bottom: 10px;
    }
</style>


