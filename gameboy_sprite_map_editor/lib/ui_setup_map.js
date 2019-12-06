

function setup_map_ui() {

    map_panel = horizontal_panel.append('div').style('float','left').style('margin','10px')
    map_panel.on('mousedown',function() { event.preventDefault ? event.preventDefault() : event.returnValue = false })

    map_panel.append('h2').text('Map Design')

    tiles_source = map_panel.append('img')
        .attr('id','tiles')
        .attr('src','tiles.png')
        .attr('width','160')
        .attr('height','32')
        .style('border','solid')
        .style('border-width','1px')

        map_panel.append('canvas')
        .attr('width','4')
        .attr('height','32')

        map_panel.append('canvas')
        .attr('id','current_tile')
        .attr('width','32')
        .attr('height','32')
        .style('border','dotted')
        .style('border-width','2px')

        map_panel.append('br')
        map_panel.append('br')

    map_edge_selection = map_panel.append('div')
        .attr('id','map_edge')
        .style('border','solid')
        .style('border-width','1px')
        //.style('position','1px')
        .style('width',`${W * CHO+2}px`)
        .style('height',`${H * CHO+2}px`)
        //.style('top',`${offset_y-2}px`)
        //.style('posleftition',`${offset_x-2}`)

    rad_sng = map_panel.append('input').attr('type','radio').attr('name','draw').attr('value','single').property('checked',true)
    map_panel.append('span').text('single')
    rad_dbl = map_panel.append('input').attr('type','radio').attr('name','draw').attr('value','double')
    map_panel.append('span').text('double')
    rad_qud = map_panel.append('input').attr('type','radio').attr('name','draw').attr('value','quad')
    map_panel.append('span').text('quad')

    current_map_canvas = map_panel.append('canvas')
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
            if (rad_dbl.node().checked & current_tile_index<current_sprites.length) {
                cell = current_map.filter(function(m,i) { if (m.x==cx & m.y==cy+1) return m })[0]          
                console.log(cx,cy,cell)
                cell.value=current_tile_index + 1
            }
            else if (rad_qud.node().checked & current_tile_index<(current_sprites.length-3)) {
                cell = current_map.filter(function(m,i) { if (m.x==cx & m.y==cy+1) return m })[0]          
                console.log(cx,cy,cell)
                cell.value=current_tile_index + 1
                cell = current_map.filter(function(m,i) { if (m.x==cx+1 & m.y==cy) return m })[0]          
                console.log(cx,cy,cell)
                cell.value=current_tile_index + 2
                cell = current_map.filter(function(m,i) { if (m.x==cx+1 & m.y==cy+1) return m })[0]          
                console.log(cx,cy,cell)
                cell.value=current_tile_index + 3
            }
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

        
        map_panel.append('hr')

        
        map_panel.append('input')
        .attr('id','clear_map')
        .attr('type','button')
        .on('click',clear_map)
        .attr('value','clear')

        map_panel.append('input')
        .attr('id','export_map')
        .attr('type','button')
        .on('click',export_map)
        .attr('value','export')

        map_panel.append('br')


        stack_panel = map_panel.append('div')

        stack_panel.append('h2').text('Map Stack')

        stack_canvas = stack_panel.append('canvas')
            .attr('id','stack_canvas')
            .attr('width',`${64}`)
            .attr('height',`${64}`)
            .style('border','solid')
            .style('border-width','1px')
            //.style('position','1px')
        
        stack_panel.append('br')
        
        stack_panel.append('input')
        .attr('id','push_map')
        .attr('type','button')
        .on('click',push_map)
        .attr('value','push')

        stack_panel.append('input')
        .attr('id','pop_map')
        .attr('type','button')
        .on('click',pop_map)
        .attr('value','pop')


        stack_panel.append('input')
        .attr('id','cycle_map')
        .attr('type','button')
        .on('click',cycle_map)
        .attr('value','cycle')


        stack_panel.append('input')
        .attr('id','export_stack')
        .attr('type','button')
        .on('click',export_stack)
        .attr('value','export')

        stack_canvas.on("mousedown", function() {
            if (map_stack.map(function(m) { return JSON.stringify(m.map)}).indexOf(JSON.stringify(current_map))==-1) push_map()
            mx=d3.event.offsetX
            my=d3.event.offsetY
            cx=Math.abs(Math.floor(mx/128))
            cy=Math.abs(Math.floor(my/128))
            console.log(cx,cy)
                current_map = map_stack[cx].map
                update_map_canvas()
        })

        
            
}
