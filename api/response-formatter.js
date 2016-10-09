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

    }

}


module.exports = ResponseFormatter;