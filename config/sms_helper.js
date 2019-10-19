export const sendOtp = (mobile_number, next) => {


    var http = require("https");
    var message= "Your##OTP##.";

    var path = `https://control.msg91.com/api/sendotp.php?otp=&sender=BRINUC&message=&mobile=${mobile_number}&authkey=295910AOHqOUTT5d8b8064`;
   // var path =`/api/sendotp.php?email=&template=&otp=&otp_length=&otp_expiry=&sender=BRIGS_NUCLEUS&message=${message}&mobile=${mobile_number}&authkey=249791AnVgew2VzoiN5c013563`
    console.log(path);
   

    var options = {
    "method": "POST",
    "hostname": "control.msg91.com",
    "port": null,
    "path": path,
    "headers": {}
    };

    var req = http.request(options, function (res) {
    var chunks = [];

        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
            next(JSON.parse(body));
        });
    });

    req.end();
}

export const resendOtp = (mobile_number, next) => {

    var qs = require("querystring");
    var http = require("https");
    var path = `https://control.msg91.com/api/retryotp.php?mobile=${mobile_number}&authkey=295910AOHqOUTT5d8b8064&retrytype=text`
    console.log(path);
    
    var options = {
      "method": "POST",
      "hostname": "control.msg91.com",
      "port": null,
      "path": path,
      "headers": {
        "content-type": "application/x-www-form-urlencoded"
      }
    };
    
    var req = http.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        next(JSON.parse(body));
      });
    });
    
    req.write(qs.stringify({}));
    req.end();
}

export const verifyOtp = (mobile_number, otp, next) => {

    
    var qs = require("querystring");
    var http = require("https");
    var path = `https://control.msg91.com/api/verifyRequestOTP.php?authkey=295910AOHqOUTT5d8b8064&mobile=${mobile_number}&otp=${otp}`
    var options = {
    "method": "POST",
    "hostname": "control.msg91.com",
    "port": null,
    "path": path,
    "headers": {
        "content-type": "application/x-www-form-urlencoded"
    }
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        next(JSON.parse(body));
        });
    });

    req.write(qs.stringify({}));
    req.end();
}

export const sendEmailOtp = (email, otp, next)=> {
    var http = require("https");
   // var path = `https://control.msg91.com/api/sendmailotp.php?authkey=295910AOHqOUTT5d8b8064&OTP=${otp}&email=${email}`

    var path = `https://control.msg91.com/api/sendmailotp.php?otp=${otp}&authkey=295910AOHqOUTT5d8b8064&email=${email}`
    
    var options = {
    "method": "POST",
    "hostname": "control.msg91.com",
    "port": null,
    "path": path,
    "headers": {}
    };

    var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
        chunks.push(chunk);
    });

    res.on("end", function () {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        next(JSON.parse(body));
    });
    });

    req.end();
}