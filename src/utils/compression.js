// https://blog.csdn.net/weixin_45693257/article/details/118331812
export function compression(original, receive) {
    var newFile = original
    try {
        const image = new Image() 
        image.src = URL.createObjectURL(original)
        image.onload = function() {
            const that = this 
            let w = that.width / 3
            let h = that.height / 3
            const scale = w / h 
            w = original.width || w 
            h = original.height || (w/scale) 
            let quality = 0.1
            const canvas = document.createElement('canvas') 
            const ctx = canvas.getContext('2d')
            const anw = document.createAttribute('width')
            anw.nodeValue = w
            const anh = document.createAttribute('height')
            anh.nodeValue = h
            canvas.setAttributeNode(anw)
            canvas.setAttributeNode(anh) 
            ctx.drawImage(that, 0, 0, w, h)
            const data = canvas.toDataURL('image/jpeg', quality)
            // console.log("dataurl: ", data)
            newFile  = convertBase64ToBlob(data)
            console.log("in compression: finally got newfile len: ", newFile.size)
            receive(newFile) // use callback,  advice from: https://stackoverflow.com/questions/7434371/image-onload-function-with-return
        }
    } catch (e) {
        console.log("compression failed: " + e)
    }
}
function convertBase64ToBlob(urlData) {
    const bytes = window.atob(urlData.split(',')[1])
    const ab = new ArrayBuffer(bytes.length)
    const ia = new Uint8Array(ab) 
    for(let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
    }
    return new Blob([ab], {type: 'image/jpeg'})
}