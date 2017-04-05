<?php 
/*
Plugin Name: Google DOCs Embed
Plugin URI: https://github.com/pvpcookie/Woordpress-Embed-doc
Author: Shaun Hogan
Description: Embed Doucment to your website with Google docs iframe. Supports almost every document format ( We love google ^_^ ). Use [googleembed] ($atts link, btn, width, height, btn-class, target, title)
Version: 1.1
Author URI: http://municor.co.za/
Domain Path: /lang
License: GPLv2
Copyright (C) 2017-2017 Open source
*/

/**
 * Add a custom button to tinymce editor
 */


function custom_mce_buttons() {
    // Check if WYSIWYG is enabled
    if ( get_user_option( 'rich_editing' ) == 'true' ) {
        add_filter( 'mce_external_plugins', 'custom_tinymce_plugin' );
        add_filter( 'mce_buttons', 'register_mce_buttons' );
    }
}
add_action('admin_head', 'custom_mce_buttons');


// Add the path to the js file with the custom button function
function custom_tinymce_plugin( $plugin_array ) {
    $plugin_array['custom_mce_button1'] = get_site_url(). '/wp-content/plugins/googleDoc/doc-embed-script.js';
    return $plugin_array;
}

// Register and add new button in the editor
function register_mce_buttons( $buttons ) {
    array_push( $buttons, 'custom_mce_button1' );
    return $buttons;
}

// Add Shortcode
function googleDoc( $atts , $content = null ) {

	// Attributes
	$atts = shortcode_atts(
		array(
			'link' => '#',
			'btn' => false,
			'width' => '100%',
			'height' => '400px',
			'btn-class' => 'embed-btn',
			'target' => '_blank',
			'title' => '',
		),
		$atts,
		'google embed'
	);

	$embed .= '<iframe src="http://docs.google.com/gview?url=';
	$embed .= $atts['link'];
	$embed .= '&amp;embedded=true"';
	$embed .= 'width="'.$atts["width"].'" height="'.$atts["height"].'"';
	$embed .= 'frameborder="0"></iframe>';

	$button .= '<a class="'.$atts["btn-class"].'" ';
	$button .= 'target="'.$atts["target"].'" ';
	$button .= 'href="'.$atts["link"].'" ';
	$button .= '>';
	$button .=  $atts["title"];
	$button .=  '</a>';

	if($atts['btn'] == 'ture') {
		return $embed.$button;
	}
	else {
		return $embed;
	}




}
add_shortcode( 'googleembed', 'googleDoc' );
