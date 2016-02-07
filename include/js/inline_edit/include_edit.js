
/**
 * Inline Editing of Galleries
 *
 */

	function gp_init_inline_edit(area_id,section_object){

		var cache_value		= '';
		var save_path		= gp_editing.get_path(area_id);
		var edit_div		= gp_editing.get_edit_area(area_id);

		if( edit_div == false || save_path == false ){
			return;
		}


		gp_editor = {
			save_path: save_path,

			checkDirty:function(){
				var curr_val = gp_editor.gp_saveData();
				if( curr_val != cache_value ){
					return true;
				}
				return false;
			},

			gp_saveData:function(){
				return $('#gp_include_form').serialize();
			},
			resetDirty:function(){
				cache_value = gp_editor.gp_saveData();
			}
		}

		gp_editing.editor_tools();
		LoadDialog();


		function LoadDialog(){
			var edit_path = save_path+'&cmd=include_dialog';
			$gp.jGoTo(edit_path);
		}


		$gp.response.gp_include_dialog = function(data){
			$('#ckeditor_top').html(data.CONTENT);

			gp_editor.resetDirty();
		}


		/**
		 * Preview the include section when selected
		 *
		 */
		$gp.inputs.IncludePreview = function(){
			gp_editing.save_changes();
		}

		/**
		 * Replace the area with the new include data
		 */
		$gp.response.gp_include_content = function(obj){
			edit_div.html(obj.CONTENT);
		}

	}
