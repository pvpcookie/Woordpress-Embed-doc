(function () {
    tinymce.PluginManager.add('custom_mce_button1', function(editor, url) {
        editor.addButton('custom_mce_button1', {
            icon: false,
            text: 'Embed Document',
            onclick: function (e) {
                editor.windowManager.open( {
                    title: 'Embed Documents',
                        body: [{
                            type: 'checkbox',
                            name: 'button',
                            checked: false,
                            text: 'Show Button'
                        },
                        {
                            type: 'checkbox',
                            name: 'target',
                            checked: false,
                            text: 'Open in a new window'
                        },
                        {
                            type: 'textbox',
                            name: 'title',
                            label: 'Title',
                            value: ''
                        },
                        {
                            type: 'textbox',
                            name: 'width',
                            label: 'Width',
                            value: ''
                        },
                        {
                            type: 'textbox',
                            name: 'height',
                            label: 'Height',
                            value: ''
                        },
                        {
                            type: 'textbox',
                            name: 'class',
                            label: 'Custom Class',
                            value: ''
                        },
                        {
                            type: 'textbox',
                            name: 'link',
                            classes: 'doc-link',
                            label: 'Document Link',
                            value: ''
                        },

                    {
                        type: 'button',
                        name: 'doc',
                        classes: 'sidetag-media-button',
                        text: 'Upload/Insert Media',
                        onclick: function( e ) {

                            jQuery(function($){

                                var frame;

                                var imgContainer = $( '.mce-doc-link' );

                                event.preventDefault();

                                if ( frame ) {
                                    frame.open();
                                    return;
                                }

                                frame = wp.media({
                                    title: 'Select or Upload Media',
                                    button: {
                                      text: 'Use this media'
                                    },
                                    multiple: false  
                                });

                                frame.on( 'select', function() {

                                    var attachment = frame.state().get('selection').first().toJSON();

                                    var imageContent = attachment.url;
                                    imgContainer.val( imageContent );

                                });

                                frame.open();
                        });
                        return false;
                        }
                    }],
                    onsubmit: function( e ) {

                        editor.insertContent( '[googleembed link="' + e.data.link + '" title="' + e.data.title + '" btn="' + e.data.button + '" width="' + e.data.width + '" height="' + e.data.height + '" btn-class="' + e.data.class + '"]');
                    }
                });
            }
        });
    });
})();
