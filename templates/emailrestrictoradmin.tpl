<div class="row">
    <div class="col-md-12">
        <h1>Email Restrictor</h1>
    </div>
</div>

<div class="row" style="padding:10px">
    <label class="control-label" for="emailRestrictions"><h5>Indica las palabras o dominios a prohibir separados por espacios</h5>
    </label>
    <br>
    <input class="col-xs-12" type="text" id="emailRestrictions" placeholder="Ej: gmail.com hotmail.com temporal">  
    <button onclick="setEmailRestrictions()">Guardar</button>
</div>

<script>

    function setEmailRestrictions()
    {
        socket.emit('admin.setEmailRestrictions', {data:$("#emailRestrictions").val()}, function(err, data){
            console.log(data);
            console.log(err);
            if(err)
            {
                alert("ERROR!");
            }
            else
            {
                alert("OK!");
            }
        });
    }

    socket.emit('admin.getEmailRestrictions', {}, function(err, data){
        // console.log(data);
        if(!err && data)
        {
            $("#emailRestrictions").val(data.data);
        }
    });

</script>