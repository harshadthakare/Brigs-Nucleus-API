var fs = require('fs');
var qr = require('qr-image');

export const  generateQrCode =(assetCode, callBack) => {
    // Generate QR Code from text
    var qr_png = qr.imageSync(assetCode, { type: 'png' })
    let qr_code_file_name = assetCode + '.png';
    fs.writeFileSync('./uploads/qrCode/' + qr_code_file_name, qr_png, (err) => {
        if (err) {
            console.log(err);
        }
    })
    // Send the link of generated QR code
    callBack("qr/" + qr_code_file_name)

}