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
                                // Set all variables to be used in scope
                                var frame;
                                //it has to match the "textareaID" above, because it is the input field that we are
                                //going to insert the data in HTML format.
                                var imgContainer = $( '.mce-doc-link' );

                                // ADD IMAGE LINK
                                event.preventDefault();

                                // If the media frame already exists, reopen it.
                                if ( frame ) {
                                    frame.open();
                                    return;
                                }

                                // Create a new media frame
                                frame = wp.media({
                                    title: 'Select or Upload Media',
                                    button: {
                                      text: 'Use this media'
                                    },
                                    multiple: false  // Set to true to allow multiple files to be selected
                                });

                                // When an image is selected in the media frame...
                                frame.on( 'select', function() {

                                    // Get media attachment details from the frame state
                                    var attachment = frame.state().get('selection').first().toJSON();

                                    // Send the attachment URL to our custom image input field.
                                    var imageContent = attachment.url;
                                    imgContainer.val( imageContent );

                                });

                                // Finally, open the modal on click
                                frame.open();
                        });
                        return false;
                        }
                    }],
                    onsubmit: function( e ) {
                        // wrap it with a div and give it a class name
                        editor.insertContent( '[googleembed link="' + e.data.link + '" title="' + e.data.title + '" btn="' + e.data.button + '" width="' + e.data.width + '" height="' + e.data.height + '" btn-class="' + e.data.class + '"]');
                    }
                });
            }
        });
    });
})();