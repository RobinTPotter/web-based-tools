function export_map() {
    var things = []
    for (var y=0;y<H;y++) {
        var stuff = current_map.filter(function(m) { if (m.y==y) return m })
            .sort(function(a,b) { if( a.x>b.x) return 1;else -1})
            
        var line_as_hex = stuff.map(function(m) { return '0x'+('00'+m.value.toString(16)).slice(-2) })
        things.push(line_as_hex) 
        //console.log(thing)
    }

    var exp = ''
    +'#define XXXWidth '+W+'\n'
    +'#define XXXHeight '+H+'\n'
    +'#define XXXBank 0\n'
    +'\nunsigned char XXX[] =\n'
    +'{\n'
    for (var tt=0;tt<things.length;tt++) {
        if (tt!=0) exp = exp + ',\n'
        exp = exp + '   ' + things[tt].join(',')
    }
    exp =exp + '\n}'

    popup_open(exp)
}
function sprites_export_gbdk() {
    var all = []
    for (var cs=0; cs<current_sprites.length;cs++) {
        var output = []
        for (var y=0;y<SH;y++) {
            var stuff = current_sprites[cs].filter(function(m) { if (m.y==y) return m })
                .sort(function(a,b) { if( a.x>b.x) return 1;else -1})   
                
            var o=0, x=0
            for (var b=0;b<SW/2;b++,x++) {
                var bits = stuff[x].value<<2*(SW/2-b-1)
                o = o | bits
            }
            output.push('0x'+('0'+o.toString(16)).slice(-2))
            o = 0
            for (var b=0;b<SW/2;b++,x++) {
                var bits = stuff[x].value<<2*(SW/2-b-1)
                o = o | bits
            }
            output.push('0x'+('0'+o.toString(16)).slice(-2))
        }
        all.push(output)
    }
    return all
}

function export_sprites() {
    var exp = 'unsigned char XXX[] =\n{\n'
    var all = sprites_export_gbdk()
    for (var aa=0;aa<all.length;aa++) {
            if (aa!=0) exp = exp + ',\n'
            exp = exp + '   ' + all[aa].join(',')
    }

    exp = exp + '\n}\n'
    popup_open(exp)
}


function old_export_sprites() {
    var thing = ''
    for (var cs=0; cs<current_sprites.length;cs++) {
        var output = []
        if (thing!='') thing = thing + '\n'
        thing = thing + "\nsprite "+cs+'\n'
        for (var y=0;y<SH;y++) {
            var stuff = current_sprites[cs].filter(function(m) { if (m.y==y) return m })
                .sort(function(a,b) { if( a.x>b.x) return 1;else -1})   
                
            if (thing!='') thing = thing + '\n'
            thing =thing + stuff.map(function(m) { return String(m.value) }) .join(',')
            var o=0, x=0
            for (var b=0;b<SW/2;b++,x++) {
                var bits = stuff[x].value<<2*(SW/2-b-1)
                //console.log(bits.toString(2))
                o = o | bits
            }
            output.push(('0'+o.toString(16)).slice(-2))
            o = 0
            for (var b=0;b<SW/2;b++,x++) {
                var bits = stuff[x].value<<2*(SW/2-b-1)
                //var bits = stuff[x].value<<2*(SW-x-1)
                o = o | bits
            }
            output.push(('0'+o.toString(16)).slice(-2))
        }
        var more_things = output.map(function(m) { return '0x'+m}).join(',')
        thing = thing + "\nsprite "+cs+'\n'+more_things 
        
    }
    popup_open(thing )    
}

function save() {
    var xhr = new XMLHttpRequest()
    xhr.open("POST", 'save', true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({"sprites": current_sprites, "map": current_map }))
}
function load() {
    var xhr = new XMLHttpRequest();
    // we defined the xhr
    
    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;
    
        if (this.status == 200) {
            var data = JSON.parse(this.responseText);
            current_sprites = data.sprites
            current_map = data.map
            update_sprite_canvas() //first!
            setTimeout(update_map_canvas, 100)
            // we get the returned data
        }
    
        // end of state change: it can be after some time (async)
    };
    
    xhr.open('GET', 'save.json', true);
    xhr.send();
}