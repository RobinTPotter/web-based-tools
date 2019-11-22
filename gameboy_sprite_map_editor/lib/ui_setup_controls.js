function setup_controls_ui() {


    var ui_controls = d3.select('body').append('div')


    panel_sprite_toggle = ui_controls.append('input')
    .attr('id','sprite_toggle')
    .property('checked',true)
    .attr('type','checkbox')
    .on('click', function() {
        if (d3.select(this).property('checked')) {sprite_panel.style('display','inline')} 
        else {sprite_panel.style('display','none')
        } 
        call_layout()
    })
    .attr('value','sprite')

    ui_controls.append('label').text('sprite')

    panel_map_toggle = ui_controls.append('input')
    .attr('id','map_toggle')
    .property('checked',true)
    .attr('type','checkbox')
    .on('click', function() {
        if (d3.select(this).property('checked')) {map_panel.style('display','inline')} 
        else {map_panel.style('display','none') 
        } 
        call_layout()
    })
    .attr('value','map')

    ui_controls.append('label').text('map')

    panel_stack_toggle = ui_controls.append('input')
    .attr('id','stack_toggle')
    .property('checked',true)
    .attr('type','checkbox')
    .on('click', function() {
        if (d3.select(this).property('checked')) {stack_panel.style('display','inline')} 
        else {stack_panel.style('display','none') 
        }
        call_layout()
    })
    .attr('value','stack')

    ui_controls.append('label').text('stack')



    save_button = ui_controls.append('input')
    .attr('id','save')
    .attr('type','button')
    .on('click', save)
    .attr('value','save')

    load_button = ui_controls.append('input')
    .attr('id','load')
    .attr('type','button')
    .on('click', load)
    .attr('value','load')

    load_button = ui_controls.append('input')
    .attr('id','paste')
    .attr('type','button')
    .on('click', paste)
    .attr('value','paste')



    filename = ui_controls.append('input').attr('id','filename').attr('type','textbox')
    filename.node().value = 'save.json'

    notice = ui_controls.append('span')
        .attr('id','notice')
        .attr('type','button')
        .text('< enabled if ran locally, see README.md')
        .style('display','none')
        .on('click',function() { d3.select(this).style('display','inline') })

    test(function(d) {
        if (d=='') {
            load_button.node().disabled=true
            save_button.node().disabled=true
            filename.node().disabled=true
            notice.style('visibility', 'visible')
        }
    })

    ui_controls.append('hr')
    

}