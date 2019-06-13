<?php


function veu_embed_style() {
	echo '<br />_|＼○_ﾋｬｯ ε=＼＿○ﾉ ﾎｰｳ!!' . '<br />' . "\n";
	die();
	wp_enqueue_style( 'wp-embed-template-org', veu_get_directory_uri( '/inc/wp-embed-template.css' ) );
}
add_action(
	'after_setup_theme', function() {
		add_filter( 'embed_head', 'veu_embed_style' );
	}
);
