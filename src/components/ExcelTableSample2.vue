<template>

    <div class="table">
        <el-button type="primary" @click="exportExcel">下载Excel</el-button>
        <el-upload
                class="upload-demo"
                action=""
                :on-change="importExcel"
                :limit="1"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false">
            <el-button size="small" type="primary">上传Excel</el-button>
        </el-upload>
        <el-table
                :data="tableData"
                style="width: 100%"
                id="out-table">
            <el-table-column
                    :formatter="dateFormat"
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import FileSaver from "file-saver";
    import XLSX from "xlsx";
    import moment from 'moment'

  export default {
    name: "ExcelTableSample2",
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        importData:[]
      }
    },

    methods: {
      //定义导出Excel表格事件
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
            "out-excel.xlsx"
          );
        } catch (e) {
          if (typeof console !== "undefined") console.log(e, wbout);
        }
        return wbout;
      },

      importExcel(param) {
        // console.log(param);
        this.file2Xce(param).then(item => {
          if (item && item.length > 0) {
            if (item[0] && item[0].sheet && item[0].sheet.length) {
              const arr = []
              item[0].sheet.map(v => {
                const obj = {}
                obj.date = v['日期']
                obj.name = v['姓名']
                obj.address = v['地址']
                arr.push(obj)
              })
              this.tableData = this.tableData.concat(arr)  //把数据塞到表格预览
            }
          }
        })
      },
      file2Xce(file) {
        return new Promise(function(resolve, reject) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const data = e.target.result;
            this.wb = XLSX.read(data, {
              type: "binary"
            });
            const result = [];
            this.wb.SheetNames.forEach(sheetName => {
              result.push({
                sheetName: sheetName,
                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
              });
            });
            /* console.log("解析")
            console.log(result) */
            resolve(result);
          };
          reader.readAsBinaryString(file.raw);
        });
      },
        dateFormat: function (row, column) {
          const date = row[column.property]
          console.info("excel2")
          console.info(date)
          if (date === undefined) {
            return ''
          }
          return moment(date).format('YYYY-MM-DD')
        }
    }
  }
</script>
<style lang="stylus">
    .home
        margin-top 50px
    .el-button {
        margin-bottom: 10px;
        position:relative;
        left:-600px;
        height:39px;
        width:100px;
    }
    .el-upload {
        margin-bottom: 10px;

    }
</style>


