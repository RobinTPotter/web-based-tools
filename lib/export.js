function export_map() {
    var thing = ''
    for (var y=0;y<H;y++) {
        var stuff = current_map.filter(function(m) { if (m.y==y) return m }).map(function(m) { return String(m.value) }).join(',') 
        if (thing!='') thing = thing + '\n'
        thing =thing + stuff
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
            var stuff = current_sprites[cs].filter(function(m) { if (m.y==y) return m }).map(function(m) { return String(m.value) }).join(',') 
            if (thing!='') thing = thing + '\n'
            thing =thing + stuff
            console.log(stuff)   
        }
    }
  
    popup_open(thing)    
}