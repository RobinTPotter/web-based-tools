
var W = 32
var H = 32
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
var colour_index=0

var  current_map = []
var  current_sprites = []

var tiles_source
var tiles_source2

var current_sprite_index = 0

var map_edge_selection
var sprite_edge_selection

var popup
var popup_inside, popup_inside_text
var popup_button_area, popup_ok_button, popup_copy_button

var save_button
var load_button
var notice
var filename

var map_stack = []
var stack_canvas

var ui_controls
var panel_map_toggle
var panel_sprite_toggle
var panel_stack_toggle

var map_panel
var sprite_panel
var stack_panel

var horizontal_panel

var tes_canvas_2x2
var tes_sprite_index = 0
var tes_canvas_3x3