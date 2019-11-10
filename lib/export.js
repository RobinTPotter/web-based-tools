function export_map() {
    var thing = ''
    for (var y=0;y<H;y++) {
        var stuff = current_map.filter(function(m) { if (m.y==y) return m })
            .sort(function(a,b) { if( a.x>b.x) return 1;else -1})
            
        if (thing!='') thing = thing + '\n'
        thing =thing + stuff.map(function(m) { return String(m.value) }) .join(',') 
        console.log(stuff)   
    }
    popup_open(thing)    
}

function export_sprites() {
    var thing = ''
    for (var cs=0; cs<current_sprites.length;cs++) {
        if (thing!='') thing = thing + '\n'
        thing = thing + "\nsprite "+cs+'\n'
        for (var y=0;y<SH;y++) {
            var stuff = current_sprites[cs].filter(function(m) { if (m.y==y) return m })
                .sort(function(a,b) { if( a.x>b.x) return 1;else -1})   
                
            if (thing!='') thing = thing + '\n'
            thing =thing + stuff.map(function(m) { return String(m.value) }) .join(',')
            var o=0, x=0
            var output = []
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
            console.log(output.map(function(m) { return '0x'+m}).join(',')) 
        }
        
    }
  
    popup_open(thing)    
}