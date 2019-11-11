
function initialize_map() {            
    //initialize map

    for (var x=0;x<W;x++) {
        for (var y=0;y<H;y++) {
            current_map.push({"x":x,"y":y, "value":0})
        }
    }
}

function update_map_canvas() {
    var ctx = current_map_canvas.node().getContext("2d")
    current_map.forEach(function(cell) {
        //console.log(cell)
        //    var ctx = element.node().getContext("2d")
        //    ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
        //console.log(cell, cell.value * 8, 0, 8, 8, cell.x*CHO, cell.y*CHO,8,8)
        ctx.drawImage(sprite_list_canvas, cell.value * 8, 0, 8, 8, cell.x * SCHO, cell.y * SCHO,8 , 8);
    })
}

function setup_map_ui_action() {

    //set up ui actions
    d3.select('#tiles').on('mouseup', function() {
        //console.log(current_tile_index)
        //current_tile_index++
        //if (current_tile_index==max_tiles) current_tile_index=0
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
