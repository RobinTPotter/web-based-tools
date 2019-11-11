function export_map() {
    var thing = ''
    for (var y=0;y<H;y++) {
        var stuff = current_map.filter(function(m) { if (m.y==y) return m })
            .sort(function(a,b) { if( a.x>b.x) return 1;else -1})
            
        if (thing!='') thing = thing + '\n'
        thing =thing + stuff.map(function(m) { return String(m.value) }) .join(',') 
        //console.log(stuff)   
    }
    popup_open(thing)    
}

function sprites_export_gbdk() {
    var output = []
    for (var cs=0; cs<current_sprites.length;cs++) {
        for (var y=0;y<SH;y++) {
            var stuff = current_sprites[cs].filter(function(m) { if (m.y==y) return m })
                .sort(function(a,b) { if( a.x>b.x) return 1;else -1})   
                
            var o=0, x=0
            for (var b=0;b<SW/2;b++,x++) {
                var bits = stuff[x].value<<2*(SW/2-b-1)
                o = o | bits
            }
            output.push(('0'+o.toString(16)).slice(-2))
            o = 0
            for (var b=0;b<SW/2;b++,x++) {
                var bits = stuff[x].value<<2*(SW/2-b-1)
                o = o | bits
            }
            output.push(('0'+o.toString(16)).slice(-2))
        }       
    }
    return output.map(function(m) { return '0x'+m})
}


function export_sprites() {
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
    popup_open(thing + '\n\nboth, 2 bit colour hex values\n' + more_things)    
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