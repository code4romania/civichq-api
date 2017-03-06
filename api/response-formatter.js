function ResponseFormatter(isdebug) {
    
    if (isdebug === undefined) {
        this.isDebug = false;
    }
    else{
        this.isDebug = isdebug;
    }
    
}

ResponseFormatter.prototype = {

    FormatSuccess: function (data) {
        var response = {
            success: true,
            errormessage: '',
            data: data
        };
        if (this.isDebug) {
            console.log('debug - writing response - success');
            console.log(response);
        }

        return response;
    },
    FormatError: function (err) {
        if (this.isDebug) {
            var response = {
                success: false,
                errormessage: err.toString(),
                data: err
            };
            console.log('debug - writing response - ERROR');
            console.log(response);
            return response;
        }
        else{
            return {
            success: false,
            errormessage: 'A survenit o eroare. Incercati mai tarziu...',
            data: {}
        }
        }

    },
    FormatFromResult(res, result){
            
            result = result.toLowerCase()
             if (this.isDebug) {
                 console.log('debug - writing response - FormatFromResult');
                console.log('printing result');
                console.log(result);
             }
            

            if (result.indexOf('error') > -1) {
                res.send(this.FormatError(result));
            }
            else {
                res.send(this.FormatSuccess(result));
            }
    }

}


module.exports = ResponseFormatter;