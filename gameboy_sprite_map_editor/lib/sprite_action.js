
function create_blank_sprite() {
    var new_sprite = []
    for (var x=0;x<SW;x++) {
        for (var y=0;y<SH;y++) {
            new_sprite.push({"x":x,"y":y, "value":0})
        }
    }
    return new_sprite
}

function rotate_sprite() {
    sprite = current_sprites[current_sprite_index].slice()
    current_sprites[current_sprite_index] = []
    for (var s in sprite) {
        current_sprites[current_sprite_index].push({"x":sprite[s].y, "y":7-sprite[s].x, "value":sprite[s].value})
    }
    update_sprite_canvas()
    if (tiles_source) update_tiles_source()
    setTimeout(update_map_canvas,100)

}

function flip_x_sprite() {
    sprite = current_sprites[current_sprite_index].slice()
    current_sprites[current_sprite_index] = []
    for (var s in sprite) {
        current_sprites[current_sprite_index].push({"x":sprite[s].x, "y":7-sprite[s].y, "value":sprite[s].value})
    }
    update_sprite_canvas()
    if (tiles_source) update_tiles_source()
    setTimeout(update_map_canvas,100)

}

function add_new_sprite() {
    var new_spr = create_blank_sprite()
    current_sprites.splice(current_sprite_index+1, 0, new_spr)
    //current_sprites.push(new_spr)
    console.log("added new",current_sprites)
    current_sprite_index = current_sprite_index+1
    sprite = current_sprites[current_sprite_index]
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
    call_layout()
}

function copy_current_sprite() {
    var clonedObj =  JSON.parse(JSON.stringify(current_sprites[current_sprite_index]))  
    current_sprites.push(clonedObj)
    console.log("added new copy",current_sprites)
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
}

function dup_sprites() {
    for (var n=0;n<4;n++) {
        var clonedObj =  JSON.parse(JSON.stringify(current_sprites[tes_sprite_index+n]))  
        current_sprites.push(clonedObj)
        console.log("added new copy",current_sprites)
    }
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
    call_layout()
}

function nudgeL() {
    if (current_sprite_index==0) return
    var removed = current_sprites.splice(current_sprite_index, 1)[0]
    current_sprites.splice(current_sprite_index-1, 0, removed)
    current_sprite_index--
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
    setTimeout(update_map_canvas,100)
}

function nudgeR() {
    if (current_sprite_index==current_sprites.length-1) return
    var removed = current_sprites.splice(current_sprite_index, 1)[0]
    current_sprites.splice(current_sprite_index+1, 0, removed)
    current_sprite_index++
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
    setTimeout(update_map_canvas,100)
}


function delete_current_sprite() {
    if (current_sprites.length==1) return
    current_sprites.splice(current_sprite_index,1)
    current_sprite_index--
    console.log("deleted",current_sprites)
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
    call_layout()
}

function clear_current_sprite() {
    current_sprites[current_sprite_index] = create_blank_sprite()
    console.log("cleared")
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
}


function cycle_sprites() {
    current_sprites.unshift(current_sprites.pop())
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
    setTimeout(update_map_canvas,100)

}

function update_sprite_canvas(s) {
    if (!current_sprite_canvas) return
    if (!s) { 
        s = current_sprite_index
    }
    var ctx = current_sprite_canvas.node().getContext("2d")
    current_sprites[s].forEach(function(cell) {
        ctx.drawImage(colour_list_canvas, cell.value * 8, 0, 8, 8, cell.x * SCHO, cell.y * SCHO,8 , 8);
        
    })
    update_tiles_source()
}


function get_sprite_data(current_sprite_index) {
  
    var temp_canvas_sprite = document.getElementById('temp_canvas_sprite');
    var ctx = temp_canvas_sprite.getContext("2d")

    if (current_sprites[current_sprite_index] === undefined ) return

    current_sprites[current_sprite_index].forEach(function(cell) {
        ctx.drawImage(colour_list_canvas, cell.value * 8, 0, 8, 8, cell.x , cell.y ,1 , 1);
        
    })
    return temp_canvas_sprite
}

function update_tiles_source() {

    //is an image
    tiles_source.attr('width',32*current_sprites.length)
    tiles_source2.attr('width',32*current_sprites.length)
    var _temp_canvas = document.getElementById('temp_canvas');
    _temp_canvas.width = 8*current_sprites.length
    var ctx = _temp_canvas.getContext("2d")

    for (var cs=0;cs<current_sprites.length;cs++) {
        ctx.drawImage(get_sprite_data(cs),0,0,8,8,cs*8,0,8,8)
    }
    //console.log(_temp_canvas, ctx)
    tiles_source.node().crossOrigin = 'anonymous'
    tiles_source.node().src = _temp_canvas.toDataURL()
    tiles_source2.node().crossOrigin = 'anonymous'
    tiles_source2.node().src = _temp_canvas.toDataURL()


    //is an image
    
    var _temp_canvas = document.getElementById('tes_canvas_2x2');
    var ctx = _temp_canvas.getContext("2d")

    var n=0
    for (var x=0;x<2;x++) {        
        for (var y=0;y<2;y++) {
            var dat = get_sprite_data(tes_sprite_index+n)
            if (dat) ctx.drawImage(dat,0,0,8,8,x*8*2,y*8*2,8*2,8*2)
            else ctx.clearRect(x*8*2,y*8*2,8*2,8*2)
            n++
        }
    }
    
    tes_canvas_2x2.node().crossOrigin = 'anonymous'
    tes_canvas_2x2.node().src = _temp_canvas.toDataURL()


   //is an image
    
   var _temp_canvas = document.getElementById('tes_canvas_3x3');
   var ctx = _temp_canvas.getContext("2d")

   for (var x=0;x<3;x++) {        
       for (var y=0;y<3;y++) {
           var dat = get_sprite_data(current_sprite_index)
           if (dat) ctx.drawImage(dat,0,0,8,8,x*8*2,y*8*2,8*2,8*2)
       }
   }
   
   tes_canvas_3x3.node().crossOrigin = 'anonymous'
   tes_canvas_3x3.node().src = _temp_canvas.toDataURL()



    

}





function setup_sprite_ui_action() {
    d3.select('#colours')
        .on('mouseup', function() {
            mx=d3.event.offsetX
            my=d3.event.offsetY
            cx=Math.abs(Math.floor(mx/32))
            cy=Math.abs(Math.floor(my/32))
            console.log(cx,cy)
            colour_index = cx
            var ctx = document.getElementById('current_colour').getContext('2d')
            ctx.drawImage(colours, colour_index*8, 0, 8, 8,
                0, 0, 32, 32)
        })

        

    //set up ui actions
    d3.select('#tiles2').on('mouseup', function() {
        mx=d3.event.offsetX
        my=d3.event.offsetY
        cx=Math.abs(Math.floor(mx/32))
        cy=Math.abs(Math.floor(my/32))
        console.log(cx,cy)
        current_tile_index = cx
        var ctx = document.getElementById('current_tile').getContext('2d')
        ctx.drawImage(tiles, current_tile_index*8, 0, 8, 8,
            0, 0, 32, 32)
        current_sprite_index = current_tile_index
        update_sprite_canvas()
    })
}
