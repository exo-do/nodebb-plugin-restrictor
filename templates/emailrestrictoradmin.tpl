<div class="row">
    <div class="col-md-12">
        <h1>Email Restrictor</h1>
    </div>
</div>

<div class="row" style="padding:10px">
    <label class="control-label" for="emailRestrictions"><h5>Indicate the words or domains to be forbidden separated by spaces</h5>
    </label>
    <br>
    <input class="col-xs-12" type="text" id="emailRestrictions" placeholder="Ej: gmail.com hotmail.com temporal">  
    <button onclick="setEmailRestrictions()">Save</button>

    <br><br>

    <label class="control-label" for="IPRestrictions"><h5>Indicate the IP sparated by spaces</h5>
    </label>
    <br>
    <input class="col-xs-12" type="text" id="IPRestrictions" placeholder="Ej: 127.0.0.1 localhost">  
    <button onclick="setIPRestrictions()">Save</button>
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

    function setIPRestrictions()
    {
        socket.emit('admin.setIPRestrictions', {data:$("#IPRestrictions").val()}, function(err, data){
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
    socket.emit('admin.getIPRestrictions', {}, function(err, data){
        // console.log(data);
        if(!err && data)
        {
            $("#IPRestrictions").val(data.data);
        }
    });

</script>
