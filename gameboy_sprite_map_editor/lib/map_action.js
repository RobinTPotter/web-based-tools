
function initialize_map() {            
    //initialize map

    for (var x=0;x<W;x++) {
        for (var y=0;y<H;y++) {
            current_map.push({"x":x,"y":y, "value":0})
        }
    }
    console.log('inititalized map')
}

function update_map_canvas(callback) {
    var ctx = current_map_canvas.node().getContext("2d")
    current_map.forEach(function(cell) {
        //console.log(cell)
        //    var ctx = element.node().getContext("2d")
        //    ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
        //console.log(cell, cell.value * 8, 0, 8, 8, cell.x*CHO, cell.y*CHO,8,8)
        ctx.drawImage(sprite_list_canvas, cell.value * 8, 0, 8, 8, cell.x * CHO, cell.y * CHO,CHO , CHO);
    })
    if (callback) callback()
}

function setup_map_ui_action() {

    //set up ui actions
    d3.select('#tiles').on('mouseup', function() {
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

function clear_map() {
    current_map = []
    initialize_map()
    update_map_canvas()
    console.log('cleared')
}

function pop_map() {
    if (map_stack.length==0) return
    current_map = map_stack.pop().map
    update_map_canvas()
    update_stack()
    console.log('popped')
}




function push_map() {
    data = current_map_canvas.node().toDataURL()
    map_stack.push({"map": current_map, "image": data})
    console.log('stack now '+map_stack.length)
    current_map = []
    initialize_map()
    update_map_canvas(update_stack)
    console.log('push')
    setTimeout(update_stack, 100)
    
}

function cycle_map() {
    map_stack.unshift(map_stack.pop())
    update_stack()
    console.log('cycled')
}


function update_stack() {
    //TODO - show thumbnails of maps in stack
    //need to create the ui component
    //shrink canvas? 
    //blit
    stack_canvas.attr('width',`${128 * map_stack.length}`)
    stack_canvas.attr('height',`${128}`)
    
    var ctx = document.getElementById('stack_canvas').getContext('2d')

    for (var m=0;m<map_stack.length;m++) {
       // console.log(map_stack[m].image)
       var tmp = new Image(W*CHO,H*CHO)
       console.log(tmp)
       tmp.src =  map_stack[m].image
        ctx.drawImage(  tmp , 0, 0, CHO*W, CHO*H, m*128, 0, 128, 128 )
    }
console.log('update stack picture')

}