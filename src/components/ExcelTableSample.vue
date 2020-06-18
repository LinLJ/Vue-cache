<template>

    <div class="table">
        <el-button type="primary" @click="exportExcel">下载Excel</el-button>
        <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange"
                :on-remove="handleRemove"
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

  export default {
    name: "ExcelTableSample",
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

      //定义导入Excel表格事件
      handleChange(file, fileList){
        this.fileTemp = file.raw

        if(this.fileTemp){
          if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
            this.importfxx(this.fileTemp)

          } else {
            this.$message({
              type:'warning',
              message:'附件格式错误，请删除后重新上传！'
            })
          }
        } else {
          this.$message({
            type:'warning',
            message:'请上传附件！'
          })
        }
      },

      handleRemove(file,fileList){
        this.fileTemp = null
      },
      importfxx(obj) {
        // 通过DOM取文件数据
        this.file = obj
        const rABS = false; //是否将文件读取为二进制字符串
        const f = this.file;
        const reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          let binary = "";
          const rABS = false; //是否将文件读取为二进制字符串
          let wb; //读取完成的数据
          let outdata;
          const reader = new FileReader();
          reader.onload = function(e) {
            const bytes = new Uint8Array(reader.result);
            const length = bytes.byteLength;
            for(let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            //const XLSX = require('xlsx');
            if(rABS) {
              wb = XLSX.read(btoa(this.fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
            this.da = [...outdata]
            const arr = []
            this.da.map(v => {
              const obj = {}
              obj.date = v['日期']
              obj.name = v['姓名']
              obj.address = v['地址']
              arr.push(obj)
            })
            this.importData = arr
            console.info(arr)
            return arr
          }

          reader.readAsArrayBuffer(f);
        }

        if(rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      fixdata(data) {
        const w = 1024 << 10; //每次读取1M字节
        const len = Math.floor(data.byteLength / w);
        const o = new Array(len);
        for (let i = 0; i < len; i++)
            o[i] = String.fromCharCode.apply(null, new Uint8Array(data.slice(i * w, (i + 1) * w)));
            //o[i] = String.fromCharCode.apply(null, new Uint8Array(data.slice(i * w)));
        return o.join('');
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


