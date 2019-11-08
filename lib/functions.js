
var W = 20
var H = 20
var CHO = 8

var SW = 8
var SH = 8
var SCHO = 8

var sprite_list_canvas
var map_offset_x 
var map_offset_y   

var colour_list_canvas
var sprite_offset_x 
var sprite_offset_y   

var current_sprite_canvas
var current_map_canvas

var current_tile_index=0
var max_tiles = 5
var colour_index=0
var max_colours = 4

var  current_map = []
var  current_sprites = []

var tiles_source

var current_sprite_index

var map_edge_selection
var sprite_edge_selection

function create_blank_sprite() {
    var new_sprite = []
    for (var x=0;x<SW;x++) {
        for (var y=0;y<SH;y++) {
            new_sprite.push({"x":x,"y":y, "value":0})
        }
    }
    return new_sprite
}

function add_new_sprite() {
    var new_spr = create_blank_sprite()
    current_sprites.push(new_spr)
    console.log("added new",current_sprites)
    current_sprite_index = current_sprites.length-1
    sprite = current_sprites[current_sprite_index]
    if (tiles_source) update_tiles_source()
    update_sprite_canvas()
}

//function update_map(element, object) {
//    var ctx = element.node().getContext("2d")
//    ctx.drawImage(sprite_list_canvas, current_tile_index*8,0,8,8,0, 0,8,8);/
//}

//function update_sprite(element, object) {
// /   console.log(element.node(), object)
//    var ctx = element.node().getContext("2d")
//    ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
//}

    
function setup_sprite_ui() {

    d3.select('body').append('img')
        .attr('id','colours')
        .attr('src','colours.png')
        .attr('width','128')
        .attr('height','32')
        .style('border','solid')
        .style('border-width','1px')

        d3.select('body').append('canvas')
        .attr('id','current_colour')
        .attr('width','32')
        .attr('height','32')
        .style('border','dotted')
        .style('border-width','2px')

        d3.select('body').append('canvas')
        .attr('id','temp_canvas')
        .attr('width','8')
        .attr('height','8')
        .style('border','solid')
        .style('border-width','2px')
        .style('visibility','hidden')

        d3.select('body').append('canvas')
        .attr('id','temp_canvas_sprite')
        .attr('width','8')
        .attr('height','8')
        .style('border','dotted')
        .style('border-width','1px')
        .style('visibility','hidden')

    sprite_edge_selection = d3.select('body').append('div')
        .attr('id','sprite_edge')
        .style('border','solid')
        .style('border-width','1px')
        //.style('position','absolute')
        .style('width',`${SW * SCHO+2}px`)
        .style('height',`${SH * SCHO+2}px`)
        //.style('top',`${offset_y-2}px`)
        //.style('posleftition',`${offset_x-2}`)

    d3.select('body').append('input')
        .attr('id','new_sprite_button')
        .attr('type','button')
        .on('click',add_new_sprite)

    current_sprite_canvas = d3.select('body').append('canvas')
        .attr('id','current_sprite_canvas')
        .attr('width',`${SW * SCHO}`)
        .attr('height',`${SH * SCHO}`)
        .style('position','absolute')
        .on('mousedown', function() {
            console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
            mx=d3.event.offsetX
            my=d3.event.offsetY
            cx=Math.abs(Math.floor(mx/SCHO))
            cy=Math.abs(Math.floor(my/SCHO))
            cell = current_sprites[current_sprite_index].filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
            console.log(cx,cy,cell)
            cell.value=colour_index
            update_sprite_canvas()            
        })
        .on('mousemove', function() {
            if (d3.event.buttons==1) {
                //console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
                mx=d3.event.offsetX
                my=d3.event.offsetY
                cx=Math.abs(Math.floor(mx/SCHO))
                cy=Math.abs(Math.floor(my/SCHO))
                cell = current_sprites[current_sprite_index].filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
                //console.log(cx,cy,cell)
                cell.value=colour_index
                update_sprite_canvas()       
            }     
        })
        .on('mouseup',function() {
            update_map_canvas()
        })

}


function setup_map_ui() {
    tiles_source = d3.select('body').append('img')
        .attr('id','tiles')
        .attr('src','tiles.png')
        .attr('width','160')
        .attr('height','32')
        .style('border','solid')
        .style('border-width','1px')

    d3.select('body').append('canvas')
        .attr('id','current_tile')
        .attr('width','32')
        .attr('height','32')
        .style('border','dotted')
        .style('border-width','2px')

    map_edge_selection = d3.select('body').append('div')
        .attr('id','map_edge')
        .style('border','solid')
        .style('border-width','1px')
        //.style('position','1px')
        .style('width',`${W * CHO+2}px`)
        .style('height',`${H * CHO+2}px`)
        //.style('top',`${offset_y-2}px`)
        //.style('posleftition',`${offset_x-2}`)

    current_map_canvas = d3.select('body').append('canvas')
        .attr('id','current_map_canvas')
        .style('position','absolute')
        .attr('width',`${W * CHO}`)
        .attr('height',`${H * CHO}`)
        .on('mousedown', function() {
            console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
            mx=d3.event.offsetX
            my=d3.event.offsetY
            cx=Math.abs(Math.floor(mx/CHO))
            cy=Math.abs(Math.floor(my/CHO))
            cell = current_map.filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
            console.log(cx,cy,cell)
            cell.value=current_tile_index
            update_map_canvas()            
        })
        .on('mousemove', function() {
            if (d3.event.buttons==1) {
                //console.log('mouse down',d3.event,d3.event.offsetX,d3.event.offsetY)
                mx=d3.event.offsetX
                my=d3.event.offsetY
                cx=Math.abs(Math.floor(mx/CHO))
                cy=Math.abs(Math.floor(my/CHO))
                cell = current_map.filter(function(m,i) { if (m.x==cx & m.y==cy) return m })[0]          
                //console.log(cx,cy,cell)
                cell.value=current_tile_index
                update_map_canvas()       
            }     
        })

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

function update_sprite_canvas(s) {
    if (!current_sprite_canvas) return
    if (!s) { 
        s = current_sprite_index
    }
    var ctx = current_sprite_canvas.node().getContext("2d")
    current_sprites[s].forEach(function(cell) {
        //console.log(cell)
        //    var ctx = element.node().getContext("2d")
        //    ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
        //console.log(cell, cell.value * 8, 0, 8, 8, cell.x*CHO, cell.y*CHO,8,8)
        ctx.drawImage(colour_list_canvas, cell.value * 8, 0, 8, 8, cell.x * CHO, cell.y * CHO,8 , 8);
        
    })
    update_tiles_source()
    //update_map_canvas()
}
function get_sprite_data(current_sprite_index) {
  
    var temp_canvas_sprite = document.getElementById('temp_canvas_sprite');
    var ctx = temp_canvas_sprite.getContext("2d")

    current_sprites[current_sprite_index].forEach(function(cell) {
        //console.log(cell)
        //    var ctx = element.node().getContext("2d")
        //    ctx.drawImage(colour_list_canvas, colour_index*8,0,8,8,0, 0,8,8);
        //console.log(cell, cell.value * 8, 0, 8, 8, cell.x*CHO, cell.y*CHO,8,8)
        ctx.drawImage(colour_list_canvas, cell.value * 8, 0, 8, 8, cell.x , cell.y ,1 , 1);
        
    })
    return temp_canvas_sprite
}

function update_tiles_source() {
    //is an image
    tiles_source.attr('width',32*current_sprites.length)
    var temp_canvas = document.getElementById('temp_canvas');
    temp_canvas.width = 8*current_sprites.length
    var ctx = temp_canvas.getContext("2d")
    for (var cs=0;cs<current_sprites.length;cs++) {

        ctx.drawImage(get_sprite_data(cs),0,0,8,8,cs*8,0,8,8)
    }
    tiles_source.node().src = temp_canvas.toDataURL()


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

function setup_sprite_ui_action() {       

    d3.select('#colours')
        .on('mouseup', function() {
            //console.log(colour_index)
            //colour_index++     
            //if (colour_index==max_colours) colour_index=0
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


}

function initialize_map() {            
    //initialize map

    for (var x=0;x<W;x++) {
        for (var y=0;y<H;y++) {
            current_map.push({"x":x,"y":y, "value":0})
        }
    }
}

function gogogo() {


    add_new_sprite()
    current_sprite_index = current_sprites.length-1

    setup_sprite_ui()    
    d3.select('body').append('br')
    setup_map_ui()
    
    setup_map_ui_action()
    setup_sprite_ui_action()

    //get elements for projecting colours and tile graphics to

    sprite_list_canvas = document.getElementById("tiles");
    colour_list_canvas = document.getElementById("colours");
    

    //get offsets for laying the canvas for tiles

    map_offset_x = map_edge_selection.node().offsetLeft + 2
    map_offset_y = map_edge_selection.node().offsetTop + 2
    
    sprite_offset_x = sprite_edge_selection.node().offsetLeft + 2
    sprite_offset_y = sprite_edge_selection.node().offsetTop + 2

    initialize_map()

    current_sprite_canvas.style('top',`${sprite_offset_y}px`)
    current_sprite_canvas.style('left',`${sprite_offset_x}px`)
    current_map_canvas.style('top',`${map_offset_y}px`)
    current_map_canvas.style('left',`${map_offset_x}px`)

    //create map cells  


    //create sprite colour cells
    sprite = current_sprites[current_sprite_index]
    add_new_sprite()
    update_tiles_source()

}