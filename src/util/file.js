/**
 * @file 文件处理Util方法
 * @author mengqingchun002@ke.com
 * @date 2019/4/16 15:26
 */
const file = {
    /**
    * 下载
    * @param  {String} url 目标文件地址
    * @param  {String} filename 想要保存的文件名称
    */
    downloadRename: (url, filename) => {
        /**
        * 获取 blob
        * @param  {String} url 目标文件地址
        * @return {Promise}
        */
        function getBlob(_url) {
            return new Promise((resolve) => {
                const xhr = new XMLHttpRequest();

                xhr.open('GET', _url, true);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(xhr.response);
                    }
                };

                xhr.send();
            });
        }

        /**
        * 保存
        * @param  {Blob} blob
        * @param  {String} filename 想要保存的文件名称
        */
        function saveAs(blob, _filename) {
            if (window.navigator.msSaveOrOpenBlob) {
                navigator.msSaveBlob(blob, _filename);
            } else {
                const link = document.createElement('a');
                const body = document.querySelector('body');

                link.href = window.URL.createObjectURL(blob);
                link.download = _filename;

                // fix Firefox
                link.style.display = 'none';
                body.appendChild(link);

                link.click();
                body.removeChild(link);

                window.URL.revokeObjectURL(link.href);
            }
        }

        getBlob(url).then((blob) => {
            saveAs(blob, filename);
        });
    },

};

export default file;
