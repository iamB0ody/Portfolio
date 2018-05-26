/**************************************************/
/* GSK Veeva Master Template - Core Functionality */
/**************************************************/
/* File version              1.5.9                */
/* Last modified             27/08/2017           */
/* Last modified by          T.T.                 */
/**************************************************/

var com = com || {};
com.gsk = com.gsk || {};
com.gsk.mt = {

    // Custom object container
    custom: {},

    /* DOM Caching */
    dom: {
        body       : $("body"),
        container  : $("#container"),
        background : $(".bg"),
        email      : null
    },

    /* API fields mapping */
    apiFields: {
        Answer                  : "Answer_vod__c",
        AuxillaryId             : "AuxillaryId_vod__c",
        Call                    : "Call_vod__c",
        CLMID                   : "CLM_ID_vod__c",
        KeyMessage              : "Key_Message_vod__c",
        MobileID                : "Mobile_ID_vod__c",
        ParentId                : "ParentId_vod__c",
        PopupOpened             : "Popup_Opened_vod__c",
        PossibleAnswers         : "Possible_Answers_vod__c",
        PreferredName           : "Preferred_Name_vod__c",
        PresentationID          : "Presentation_ID_vod__c",
        Product                 : "Product_vod__c",
        SurveyQuestion          : "Question_vod__c",
        RangeValue              : "Range_Value_vod__c",
        Revision                : "Revision_vod__c",
        RolloverEntered         : "Rollover_Entered_vod__c",
        SelectedItems           : "Selected_Items_vod__c",
        SurveyType              : "Survey_Type_vod__c",
        TextEntered             : "Text_Entered_vod__c",
        ToggleButtonOn          : "Toggle_Button_On_vod__c",
        TrackElementDescription : "Track_Element_Description_vod__c",
        TrackElementId          : "Track_Element_Id_vod__c",
        TrackElementType        : "Track_Element_Type_vod__c",
        UsageDuration           : "Usage_Duration_vod__c",
        UsageStartTime          : "Usage_Start_Time_vod__c"
    },

    /* Interaction */
    isVeeva       : false,
    isEngage      : false,
    extension     : ".html",
    blockSwipes   : false,
    blockLinks    : false,
    blockClose    : false,
    lastSwipeTime : 0,
    pressEvent    : "mousedown",
    releaseEvent  : "mouseup",
    exitEvent     : "beforeunload",
    fastClick     : null,
    tap           : 0,
    isNoSwipe     : false,

    /* References */
    linkReferences  : null,
    slideReferences : null,
    slideFootnotes  : null,
    slideRefTarget  : null,

    /* Animation */
    animations: 1,

    /* Zoom */
    canZoom      : false,
    hasZoom      : false,
    zoomInterval : null,

    /* Navigation */
    swipable      : false,
    scrolling     : false,
    currentFlow   : 0,
    flows         : {},
    currentSlide  : "",
    currentPres   : "",
    previousSlide : "",
    nextSlide     : "",

    /* Email */
    emailFragments: [],

    /* Tracking */
    trackedLink  : null,
    exitingSlide : false,
    players      : [],
    currentVideo : null,
    lastStartTime: null,
    accountId    : null,
    presentationId: null,
    cstreamStack : [],
    feedback     : null,
    sendFeedback : false,

    /* Safeguards */
    maxIterations: 100, // Maximum number of form elements to process

    /* Dialogs */
    dialogStack: [], // Holds an array of all open dialogs in order opened

    /**
     * Initialisation of MT
     */
    initialise: function() {
        com.gsk.mt.isVeeva = com.gsk.mt.isVeevaEnvironment();
        com.gsk.mt.setEnvironment();

        if (navigator.userAgent.match(/iPad/i) !== null ||
            navigator.userAgent.match(/iPhone/i) !== null)
        {
            com.gsk.mt.exitEvent = "pagehide";
        }

        com.gsk.mt.currentSlide = com.gsk.mt.getCurrentSlide();
        com.gsk.mt.currentFlow = com.gsk.mt.getCurrentFlow();
        com.gsk.mt.previousSlide = com.gsk.mt.getPreviousSlide();
        com.gsk.mt.nextSlide = com.gsk.mt.getNextSlide();
        com.gsk.mt.isNoSwipe = com.gsk.mt.dom.container.hasClass("noSwipe");

        com.gsk.mt.initZoom();

        // If not using veeva swiping store the current slide and presentation
        // so that slides outside the flow can return to the correct slide.
        if (com.gsk.mtconfig.veevaSwipe === "0") {
            if(com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide) !== -1) {
                window.sessionStorage.setItem('mtgskPreviousSlide', com.gsk.mt.currentSlide);
                window.sessionStorage.setItem('mtgskPreviousPres', com.gsk.mtconfig.presentation);
            }
        }

        // If com.gsk.mtconfig.importPi is true and this slide is the PI
        if (com.gsk.mtconfig.importPi && com.gsk.mt.currentSlide === com.gsk.mtconfig.pi) {
            // Import the PI content
            com.gsk.mt.initPi();
        }

        // If com.gsk.mtconfig.importPi is true and this slide is the PI
        if (com.gsk.mtconfig.importObjection && com.gsk.mt.currentSlide === com.gsk.mtconfig.objection) {
            // Import the Objection content
            com.gsk.mt.initObjection();
        }

        // If com.gsk.mtconfig.importGuide is true and this slide is a guide
        if (com.gsk.mtconfig.importGuide && com.gsk.mt.currentSlide === com.gsk.mt.lastSlide + "_GUIDE") {
            // Import the Guide content
            com.gsk.mt.initGuide();
        }

        // Init techOrder for video.js if logged videos are present
        if ($(".logVideo").length) {
            videojs.options.techOrder = ['html5'];
        }

        // Initialise US elements if specified and present
        if (com.gsk.mtconfig.mtgskUS && $("#isiRail").length > 0) {
            com.gsk.mt.initUS();
        }

        com.gsk.mt.initPortfolio();
        com.gsk.mt.initNavigation();
        com.gsk.mt.initReferences();
        com.gsk.mt.initTracking();
        com.gsk.mt.initSubSlides();
        // Only initialise email if com.gsk.mtconfig.useEmail is true
        if (com.gsk.mtconfig.useEmail) {
            com.gsk.mt.initEmail();
        }

        $("body").css("touch-action", "none");

        com.gsk.mt.initDialogs();

        // noSwipe elements will prevent swiping to the next and previous slide
        // Now allows noSwipe elements to be inserted dynamically.
        com.gsk.mt.dom.container.on(com.gsk.mt.pressEvent, ".noSwipe", function(e) {
            e.stopPropagation();
        });

        // Initialise scrollable elements - timeout is required to allow rendering to complete.
         setTimeout(function() {
            com.gsk.mt.initScrollable();
            $("#customMenu").removeClass("load");
        }, 500);

        if (com.gsk.mt.onInitPres !== undefined) {
            com.gsk.mt.onInitPres();
        }

        if (com.gsk.mt.onInit !== undefined) {
            com.gsk.mt.onInit();
        }
    },

    /**
     * Initialise Portfolio slide
     */
    initPortfolio: function() {
        var container = $("#portfolioPresentationContainer"),
            presentations = com.gsk.mtconfig.portfolioPresentations,
            flowList = '<div id="closeFlowSelector"></div>';

        if (container.length > 0 && presentations.length > 0) {
            for (var i = 0, j = 0; i < presentations.length; i++) {
                if (j === 0) {
                    container.append('<div class="gskRow">');
                }

                container.append('<div class="gskCol gskCol' + com.gsk.mtconfig.presentationsPerRow +
                    '"><img class="gotoSlide" src="media/thumbnails/' +
                    presentations[i].presentation + '.png" width="100%" data-slide="' +
                    presentations[i].slide + '" data-presentation="' +
                    presentations[i].presentation + '" /><div>' +
                    presentations[i].presentation_name + '</div></div>');

                flows = presentations[i].flows;

                for (var ii = 0; ii < flows.length; ii++) {
                    flowList += '<div class="flowSelect gotoFlow" data-slide="' +
                        flows[ii].slide + '" data-presentation="' + presentations[i].presentation +
                        '" data-flow="' + flows[ii].flow + '">' + flows[ii].label + '</div>';
                }

                if (j === com.gsk.mtconfig.presentationsPerRow - 1 || i === presentations.length - 1) {
                    j = 0;
                    container.append('</div>');
                } else {
                    j++;
                }
            }

            window.sessionStorage.setItem("mtgskPortfolioLinked", true);
            window.sessionStorage.setItem("mtgskCurrentFlow", "Main");

            container.on(com.gsk.mt.pressEvent, ".portfolioData", function() {
                var data = $(this),
                    presentation = JSON.parse(data.attr("data-presentation")),
                    flows;

                $(".portfolioSelected").removeClass("portfolioSelected");
                data.addClass("portfolioSelected");
            });

            $("#flowSelectorInner").html(flowList);

            $(".portfolioFlowSelector").hide();

            $("#shortFlow").on(com.gsk.mt.releaseEvent, function() {
                $(".portfolioFlowSelector").css("left", 50).toggle();
            });

            $("body").on(com.gsk.mt.releaseEvent, "#closeFlowSelector", function() {
                $(".portfolioFlowSelector").hide();
            });

            $("#flowSelectorInner").on(com.gsk.mt.releaseEvent, ".flowSelect", function() {
                window.sessionStorage.setItem('mtgskCurrentFlow', $(this).attr("data-flow"));
                window.sessionStorage.removeItem('mtgskFlows');
                $(this).removeAttr("data-flow");
                com.gsk.mt.processGotoSlide($(this));
            });
        } else if (com.gsk.mtconfig.portfolio.length > 0) {
            $(".navBottom").append('<div id="portfolio" class="gotoSlide" data-slide="' +
                com.gsk.mtconfig.portfolio + '" data-presentation="' + com.gsk.mtconfig.portfolioPresentation + '"></div>');
            $("#portfolio").css("display", "inline-block");
        }

        com.gsk.mt.dom.body.on(com.gsk.mt.pressEvent, ".noSwipe, .ui-draggable, .ui-sortable-handle, .ui-slider-handle", function(e) {
            com.gsk.mt.blockLinks = true;
        });

        com.gsk.mt.dom.body.on(com.gsk.mt.releaseEvent, ".noSwipe, .ui-draggable, .ui-sortable-handle, .ui-slider-handle", function(e) {
            setTimeout(function() {
                com.gsk.mt.blockLinks = false;
            }, 250);
        });

        com.gsk.mt.dom.body.on(com.gsk.mt.pressEvent, ".navBottom div, #mtgskClose", function(e) {
            e.stopPropagation();
        });
    },

    /*
     * Initialise zoom functionality
     */
    initZoom: function() {
        if (com.gsk.mt.isVeeva && com.gsk.mtconfig.mtgskPortrait === "0") {
            $('[name="viewport"]').attr("content","user-scalable=yes, width=device-width, minimum-scale=1, maximum-scale=" + com.gsk.mtconfig.maxZoom);

            document.addEventListener('touchmove', function (e) {
                var zoom = detectZoom.zoom();

                if ((e.touches.length < 2 && zoom <= 1) || !com.gsk.mt.canZoom) {
                    // Clear functionality blocking when pinch to zoom out to 1.0
                    e.preventDefault();
                }
            }, false);

            if (com.gsk.mtconfig.pinchToZoomSlides.indexOf(com.gsk.mt.currentSlide) > -1) {
                $(".navBottom").append('<div id="pinchToZoomIndicator"></div>');

                com.gsk.mt.canZoom = true;
                // Interval used to detect zoom level when zoomed in so that functionality can be restored.
                com.gsk.mt.zoomInterval = setInterval(function() {
                    var zoom = detectZoom.zoom();
                    if (com.gsk.mt.hasZoom > 0 && zoom <= 1) {
                        com.gsk.mt.hasZoom = 0;
                        setTimeout(function() {
                            $("#zoomOverlay").remove();
                            com.gsk.mt.scrolling = false;
                        }, 250);
                    } else if(zoom > 1 && $("#zoomOverlay").length < 1) {
                        com.gsk.mt.hasZoom = 1;
                        $('<div id="zoomOverlay" class="noSwipe"></div>').appendTo(com.gsk.mt.dom.body);
                    }
                }, 100);
            }
        }
    },

    /**
     * Initialise navigation elements
     */
    initNavigation: function() {
        // Disable or activate nav elements where applicable.
        com.gsk.mt.initNavElements();

        var inlineContent = $(".inlineContent");
        if (inlineContent.length > 0) {
            $.each(inlineContent, function() {
                com.gsk.mt.initInlineContent($(this));
            });
            com.gsk.mt.dom.container.addClass("noSwipe");
        }

        // If not using veeva swipes, swiping the container will move to the
        // next or previous slide depending upon direction. If using custom
        // swipes (indicated by the container having the class customSwipe)
        // this binding will be ignored.
        if ((com.gsk.mtconfig.veevaSwipe === "0" || !com.gsk.mt.isVeeva) &&
            com.gsk.mt.dom.container.length &&
            !com.gsk.mt.dom.container.hasClass("customSwipe") &&
            (!com.gsk.mt.dom.container.hasClass("noSwipe") || $(".inlineContent").length > 0))
        {
            com.gsk.mt.initSwipes();
        }
        // Double-click bumpers on either side of the screen
        var $navBumper = $(".navBumper");
        if ($navBumper.length) {
            $.each($navBumper, function() {
                var $this = $(this);
                var id = $this.attr("id");
                if (id === "doubleClickLeft") {
                    com.gsk.mt.bindInteraction("#doubleClickLeft", "doubletap", {}, com.gsk.mt.gotoPreviousSlide);
                } else if (id === "doubleClickRight") {
                    com.gsk.mt.bindInteraction("#doubleClickRight", "doubletap", {}, com.gsk.mt.gotoNextSlide);
                }
            });
        }

        // Trigger processing of gotoSlide elements on tap
        if ($(".gotoSlide").length) {
            $(".gotoSlide").addClass("needsclick");
            com.gsk.mt.bindInteraction(".gotoSlide", com.gsk.mt.pressEvent, {}, function(e) {
                e.stopPropagation();
                com.gsk.mt.blockLinks = false;
            });

            com.gsk.mt.bindInteraction(".gotoSlide", com.gsk.mt.releaseEvent, {}, function(e) {
                if (!com.gsk.mt.scrolling) {
                    com.gsk.mt.processGotoSlide($(e.target));
                }
            });
        }

        com.gsk.mt.bindInteraction(".gotoFlow", com.gsk.mt.pressEvent, {}, function(e) {
            e.stopPropagation();
            com.gsk.mt.blockLinks = false;
        });

        // Trigger processing of gotoFlow elements on tap
        com.gsk.mt.bindInteraction(".gotoFlow", com.gsk.mt.releaseEvent, {}, function(e) {
            if (!com.gsk.mt.scrolling) {
                com.gsk.mt.processGotoFlow($(e.target));
            }
        });

        // Close a slide, returning to the previously stored slide
        if ($("#mtgskClose").length) {
            com.gsk.mt.bindInteraction("#mtgskClose", com.gsk.mt.releaseEvent, {}, com.gsk.mt.closeSlide);
        }

        // Initialise portrait mode
        if (com.gsk.mtconfig.mtgskPortrait === '1') {
            com.gsk.mt.bindInteraction("#doubleClickCentre", "doubletap", {}, com.gsk.mt.resizePortrait);
            com.gsk.mt.dom.body.addClass("portrait");
        }
    },

    initSwipes: function() {
        com.gsk.mt.swipable = true;

        var elements = $("#container").get(0);
        com.gsk.mt.bindSwipe(elements, {}, com.gsk.mt.swipeEvent);

        if (com.gsk.mtconfig.enableSwipesOnDialog) {
            $("body").hammer({touchAction: 'auto'}).bind("swipe", ".ui-front, #customMenuWrapper, #customMenu", com.gsk.mt.swipeEvent);
        }
    },

    swipeEvent: function(e) {
        var event = e,
            direction = e.direction;

        if (direction === undefined && e.gesture !== undefined) {
            event = e.gesture;
            direction = e.gesture.direction
        }

        if (!com.gsk.mt.canSwipe(e)) {
            return;
        }

        if (direction === Hammer.DIRECTION_RIGHT) {
            com.gsk.mt.gotoPreviousSlide();
        } else if (direction === Hammer.DIRECTION_LEFT) {
            com.gsk.mt.gotoNextSlide();
        }
    },

    /**
     * initialise a custom swipe
     * @param {Object} navDestinations
     */
    customSwipe: function(navDestinations) {
        if (com.gsk.mt.dom.container.length &&
            com.gsk.mt.dom.container.hasClass("customSwipe") &&
            !$.isEmptyObject(navDestinations))
        {
            var elements = $("#container").get(0);
            com.gsk.mt.bindSwipe(elements, { direction: Hammer.DIRECTION_ALL }, function(e) {
                if (!com.gsk.mt.canSwipe(e)) {
                    return;
                }

                if (navDestinations.flow !== undefined) {
                    if (com.gsk.mtconfig.flows[navDestinations.flow] !== undefined) {
                        window.sessionStorage.setItem('mtgskCurrentFlow', navDestinations.flow);
                    } else {
                        com.gsk.mt.debug("Flow index (" + navDestinations.flow + ") out of range");
                    }
                }
                var direction = e.direction;
                if (direction === Hammer.DIRECTION_RIGHT) {
                    com.gsk.mt.processCustomSwipe(navDestinations, "right");
                } else if (direction === Hammer.DIRECTION_LEFT) {
                    com.gsk.mt.processCustomSwipe(navDestinations, "left");
                } else if (direction === Hammer.DIRECTION_UP) {
                    com.gsk.mt.processCustomSwipe(navDestinations, "up");
                } else if (direction === Hammer.DIRECTION_DOWN) {
                    com.gsk.mt.processCustomSwipe(navDestinations, "down");
                }
            });

            if (com.gsk.mtconfig.enableSwipesOnDialog) {
                $("body").hammer({touchAction: 'auto'}).bind("swipe", ".ui-front, #customMenuWrapper, #customMenu", function(e) {
                    if (navDestinations.flow !== undefined) {
                        if (com.gsk.mtconfig.flows[navDestinations.flow] !== undefined) {
                            window.sessionStorage.setItem('mtgskCurrentFlow', navDestinations.flow);
                        } else {
                            com.gsk.mt.debug("Flow index (" + navDestinations.flow + ") out of range");
                        }
                    }
                    if (e.gesture === undefined) {
                        return;
                    }
                    var direction = e.gesture.direction;
                    if (direction === Hammer.DIRECTION_RIGHT) {
                        com.gsk.mt.processCustomSwipe(navDestinations, "right");
                    } else if (direction === Hammer.DIRECTION_LEFT) {
                        com.gsk.mt.processCustomSwipe(navDestinations, "left");
                    } else if (direction === Hammer.DIRECTION_UP) {
                        com.gsk.mt.processCustomSwipe(navDestinations, "up");
                    } else if (direction === Hammer.DIRECTION_DOWN) {
                        com.gsk.mt.processCustomSwipe(navDestinations, "down");
                    }
                });
            }
        }
    },

    canSwipe: function(e) {
        var event = e,
            direction = e.direction;

        if (direction === undefined && e.gesture !== undefined) {
            event = e.gesture;
            direction = e.gesture.direction
        }

        if (direction === undefined || com.gsk.mt.blockSwipes || $(event.target).hasClass("noSwipe")) {
            return false;
        }

        if (e.timeStamp - com.gsk.mt.lastSwipeTime < 100) {
            com.gsk.mt.lastSwipeTime = e.timeStamp;
            return false;
        }

        com.gsk.mt.lastSwipeTime = e.timeStamp;
        return true;
    },

    /**
     * Manage navbar
     */
    initNavElements: function() {
        var dialogId,
            $home = $('#home'),
            $menu = $('#menu'),
            $references = $('#references'),
            $pi = $('#pi'),
            $email = $('#email'),
            $objection = $('#objection'),
            $guide;

        var domManipulation = {
            addClass: []
        }

        // If any of the embed values are true, create a dialog.
        if (com.gsk.mtconfig.embedMenu || com.gsk.mtconfig.embedReferences || com.gsk.mtconfig.embedPi ||
            com.gsk.mtconfig.embedObjection || com.gsk.mtconfig.embedGuides ||
            (com.gsk.mtconfig.customMenu !== undefined && com.gsk.mtconfig.customMenu.length > 0))
        {
            dialogId = com.gsk.mt.createQuickLinkDialogFrame();
        }

        if (com.gsk.mtconfig.customMenu.length > 0) {
            if (com.gsk.mtconfig.embedMenu) {
                $menu.addClass("display")
                .removeClass("gotoSlide logEmbedded")
                .attr("data-show", "#customMenuWrapper");

                com.gsk.mt.createQuickLinkCustomMenu($menu);

                com.gsk.mt.dom.body.on(com.gsk.mt.releaseEvent, "#menu", function() {
                    $("#customMenuWrapper").show();
                    $(".ui-dialog-titlebar-close").trigger("click");
                    com.gsk.mt.dom.container.removeClass("noSwipe");
                });

                com.gsk.mt.dom.body.on(com.gsk.mt.releaseEvent, "#closeCustomMenu", function() {
                    $("#customMenuWrapper").hide();
                    if (com.gsk.mt.isNoSwipe) {
                        com.gsk.mt.dom.container.addClass("noSwipe");
                    }
                });
            } else if (com.gsk.mtconfig.menu === com.gsk.mt.currentSlide) {
                com.gsk.mt.createCustomMenu($menu);
                $menu.addClass('activeNav display');
            } else {
                $menu.addClass('display');
            }
        } else if (com.gsk.mtconfig.menu !== com.gsk.mt.currentSlide) {
            if (com.gsk.mtconfig.embedMenu) {
                $menu.removeClass("gotoSlide")
                .addClass("openDialog display")
                .attr("data-quicklink", "Menu")
                .attr("data-dialog", "#" + dialogId);

                com.gsk.mt.createQuickLinkMenu();
            }
        } else {
            $menu.addClass('display');
        }

        if (com.gsk.mtconfig.embedReferences) {
            if (com.gsk.mtconfig.referencesAll.length > 0 ||
                com.gsk.mtconfig.referencesAll.length > 0)
            {
                $references.removeClass("gotoSlide")
                .addClass("gotoRef openDialog display")
                .attr("data-quicklink", "References")
                .attr("data-dialog", "#" + dialogId)
                .attr("data-reftarget", "PAGE");
                com.gsk.mt.createQuickLinkReferences();
            }
        } else if (!com.gsk.mtconfig.embedReferences &&
            com.gsk.mtconfig.references.length > 0 &&
            com.gsk.mtconfig.referencesAll.length > 0)
        {
            if (com.gsk.mtconfig.references === com.gsk.mt.currentSlide) {
                $references.addClass("activeNav display");
            } else {
                $references.addClass('display');
            }
        }

        if (com.gsk.mtconfig.embedPi) {
            $pi.removeClass("gotoSlide")
            .addClass("openDialog display")
            .attr("data-quicklink", "Pi")
            .attr("data-dialog", "#" + dialogId);

            com.gsk.mt.createQuickLinkPi();
        } else if (!com.gsk.mtconfig.embedPi && com.gsk.mtconfig.pi !== "") {
            if (com.gsk.mtconfig.pi === com.gsk.mt.currentSlide) {
                $pi.addClass("activeNav display");
            } else {
                $pi.addClass("display");
            }
        }

        if (com.gsk.mt.currentSlide !== com.gsk.mtconfig.objection) {
            if (com.gsk.mtconfig.embedObjection) {
                $objection.removeClass("gotoSlide")
                .addClass("openDialog display")
                .attr("data-quicklink", "Objection")
                .attr("data-dialog", "#" + dialogId);

                com.gsk.mt.createQuickLinkObjection();
            } else if (!com.gsk.mtconfig.embedObjection && com.gsk.mtconfig.objection !== "") {
                $objection.addClass("display");
            }
        } else {
            $objection.addClass("activeNav display");
        }

        if (com.gsk.mtconfig.pagesGuides[com.gsk.mt.currentSlide] !== undefined) {
            var guide = com.gsk.mtconfig.pagesGuides[com.gsk.mt.currentSlide];

            $(".navBottom").append('<div id="guide" class="gotoSlide logEmbedded" data-description="Embedded Guide"></div>');
            $guide = $('#guide')

            if (com.gsk.mtconfig.embedGuides) {
                $guide.removeClass("gotoSlide")
                .addClass("openDialog display")
                .attr("data-quicklink", "Guide")
                .attr("data-dialog", "#" + dialogId);

                com.gsk.mt.createQuickLinkGuide();
            } else if (!com.gsk.mtconfig.embedGuides) {
                $guide.addClass('display');
                $guide.attr("data-slide", guide.slide);
                if (guide.presentation !== undefined) {
                    $guide.attr("data-presentation", guide.presentation);
                }
            }
        }

        if (com.gsk.mtconfig.homepage !== "") {
            var flow = com.gsk.mtconfig.flows[com.gsk.mt.currentFlow],
                flowHome = com.gsk.mtconfig.pagesAll[com.gsk.mtconfig.flows[com.gsk.mt.currentFlow][0]],
                inFlow = flow.indexOf(0) > -1,
                targetFlow = inFlow ? com.gsk.mt.currentFlow : "Main";

            $home.addClass("gotoFlow display").attr("data-flow", targetFlow);
            if (com.gsk.mtconfig.homeResetsFlows) {
                if (com.gsk.mtconfig.homepage === com.gsk.mt.currentSlide) {
                    $home.addClass('activeNav');
                }
            } else if ((com.gsk.mt.currentFlow !== "Main" && flowHome === com.gsk.mt.currentSlide) ||
                    (com.gsk.mt.currentFlow === "Main" && com.gsk.mtconfig.homepage === com.gsk.mt.currentSlide))
            {
                $home.addClass("activeNav");
            }
        }

        if (com.gsk.mtconfig.useEmail) {
            $('#email').addClass('display');
        }

        var flows = [];
        $.each(com.gsk.mtconfig.flows, function(key) {
            flows.push(key);
        });
        if (flows.length > 1) {
            var $shortFlowButton = $('<div id="shortFlow"></div>');

            com.gsk.mt.insertFlowSelector(flows);
            com.gsk.mt.bindInteraction("#shortFlow", com.gsk.mt.releaseEvent, {}, function() {
                $("#fragmentSelector").addClass("hidden");
                $("#quickLinkDialog").parent().find(".ui-dialog-titlebar-close").trigger("click");
                $("#flowSelector").toggleClass("hidden");
            });
            com.gsk.mt.bindInteraction("#closeFlowSelector", com.gsk.mt.releaseEvent, {}, function() {
                $("#flowSelector").addClass("hidden");
            });
            $shortFlowButton.addClass('display').insertAfter($email);
            $("#flowSelector").css({
                "left": $shortFlowButton[0].getBoundingClientRect().left - parseInt($("#flowSelector").css("width")) / 2 + 22
            });
        }

        $(".navBottom>*").addClass("needsclick");
    },

    /**
     * Create a quick link dialog
     * @returns {string} id of the new dialog
     */
    createQuickLinkDialogFrame: function() {
        var id = "quickLinkDialog";

        $('<div id="quickLinkDialog" class="dialog noTitlebar quickLinkDialog hidden" ' +
            'title="" data-width="800" data-height="500" data-description="Embedded ' +
            'Quick Link"><div class="dialogBody embeddedQuickLink"></div></div>').insertAfter("#bg");

        return id;
    },

    /**
     * Create the dialog content for the menu dialog
     */
    createQuickLinkMenu: function() {
        var $dialogBody = $("#quickLinkDialog .dialogBody"),
            heading = com.gsk.mtconfig.localisation['menu'],
            dialogContent = '';

        if (heading === undefined) {
            heading = 'Menu';
        }

        dialogContent = '<div class="quickLinkDialogContent quickLinkDialogMenu hidden"><h3>' + heading + '</h3><ul>';

        for (var ii = 0; ii < com.gsk.mtconfig.pagesAll.length; ii++) {
            dialogContent += '<li class="gotoFlow" data-slide="' +
                com.gsk.mtconfig.pagesAll[ii] + '" data-presentation="' +
                com.gsk.mtconfig.presentation + '" data-flow="Main">' +
                com.gsk.mtconfig.pagesDesc[ii] + '</li>';
        }

        dialogContent += "</ul></div>";

        $dialogBody.append(dialogContent);
    },

    /**
     * Create the custom menu
     * @param {Object} $container
     */
    createQuickLinkCustomMenu: function($container) {
        var dialogContent = com.gsk.mt.getCustomMenuContent(true);

        com.gsk.mt.dom.container.append(dialogContent);

        $.each($("div.customMenuItems"), function() {
            if (parseInt($(this).css("height")) < parseInt($(this).find(".scrollableInner").css("height"))) {
                com.gsk.mt.initScroller($(this));
            }
        });

        $("#customMenuWrapper").removeClass("mtLoad");

        if (!com.gsk.mtconfig.enableSwipesOnDialog) {
            $('#customMenuWrapper, #customMenu, #customMenu *').addClass("noSwipe");
        }
        if (com.gsk.mtconfig.enableQuickLinksOnDialog) {
            $('#customMenuWrapper').addClass("enableQuickLinks");
        }
    },

    /**
     * Create the custom menu for the menu slide
     * @param {Object} $container
     */
    createCustomMenu: function() {
        var heading = com.gsk.mtconfig.localisation['custom-menu'],
            dialogContent = com.gsk.mt.getCustomMenuContent(false);

        if (heading === undefined) {
            heading = 'Menu';
        }

        $(".mainContent").html('<div class="pageTitle">' + heading + '</div>');
        $("#container").append(dialogContent);
    },

    /**
     * Generate the custom menu
     * @returns {string}
     */
    getCustomMenuContent: function(close) {
        var heading = com.gsk.mtconfig.localisation['custom-menu'],
            dialogContent = "",
            className = "",
            menuClass = "";

        if (heading === undefined) {
            heading = 'Menu';
        }

        if (!close) {
            className = "inlineMenu";
            heading = "";
        } else {
            heading = '<h3>' + heading + '</h3>'
        }

        dialogContent = '<div id="customMenuWrapper" class="mtLoad ' + className + '"><div id="customMenu"' + menuClass + '>' + heading;

        if (close) {
            dialogContent += '<div id="closeCustomMenu" data-hide="#customMenu"></div>';
        }

        dialogContent += '<ul class="customMenu">';

        for (var ii = 0; ii < com.gsk.mtconfig.customMenu.length; ii++) {
            var menuItem = com.gsk.mtconfig.customMenu[ii];

            dialogContent += '<li class="customMenuKeyMessage"><div class="keyMessage">' + menuItem.title + '</div><div id="customMenuItems' + ii + '" class="customMenuItems scrollable"><ul class="scrollableInner">';

            for (var jj = 0; jj < menuItem.slides.length; jj++) {
                dialogContent += '<li class="gotoFlow" data-slide="' +
                    com.gsk.mtconfig.pagesAll[menuItem.slides[jj]] + '" data-presentation="' +
                    com.gsk.mtconfig.presentation + '" data-flow="Main">' +
                    com.gsk.mtconfig.pagesDesc[menuItem.slides[jj]] + '</li>';
            }

            dialogContent += '</ul></div>'
        }

        dialogContent += "</ul></div></div>";

        return dialogContent;
    },

    /**
     * Create the dialog content for the references dialog
     */
    createQuickLinkReferences: function() {
        var $dialogBody = $("#quickLinkDialog .dialogBody"),
            headingRefs = com.gsk.mtconfig.localisation['references'],
            headingFoot = com.gsk.mtconfig.localisation['footnotes'],
            dialogContent = '<div class="quickLinkDialogContent quickLinkDialogReferences hidden">';

        if (headingRefs === undefined) {
            headingRefs = 'References';
        }
        if (headingFoot === undefined) {
            headingFoot = 'Footnotes';
        }

        $("#quickLinkDialog").append('<div class="topNav referenceSelector"><div id="referencesPage"></div>' +
            '<div id="referencesAll"></div></div>');

        if (com.gsk.mtconfig.referencesAll.length > 0) {
            dialogContent += '<div class="embeddedReferences"><div class="references">' +
                '<h3>' + headingRefs + '</h3><ol id="referenceList"></ol></div></div>';
        }

        if (com.gsk.mtconfig.footnotesAll.length > 0) {
            dialogContent += '<div class="embeddedFootnotes"><div class="footnotes">' +
                '<h3>' + headingFoot + '</h3><ol id="footnotesList"></ol></div></div>';
        }

        $dialogBody.append(dialogContent + '</div>');
    },

    /**
     * Create the dialog content for the PI dialog
     */
    createQuickLinkPi: function() {
        var $dialog = $("#quickLinkDialog"),
            dialogBody = $dialog.find(".dialogBody");

        dialogBody.append('<div class="quickLinkDialogContent quickLinkDialogPi hidden"></div>');
        window.addEventListener('message', com.gsk.mt.embeddedPiHandler);
        com.gsk.mt.dom.body.append('<iframe id="piContentLoader" class="contentLoader" src="../shared/media/content/pi.html"></iframe>');
    },

    /**
     * Handle PI popup import
     * @param {Object} event
     */
    embeddedPiHandler: function(event) {
        var data;

        if (event.data !== undefined) {
            data = JSON.parse(event.data);
        }

        if (data.html_content !== undefined) {
            var iframe = $("#piContentLoader");
            $(".quickLinkDialogPi").addClass("pi").html(data.html_content);
            iframe.remove();
        } else {
            return;
        }

        // Clean up
        window.removeEventListener('message', com.gsk.mt.embeddedPiHandler);
    },

    /**
     * Initialise PI slide
     */
    initPi: function() {
        $(".mainContent").html('<div id="piScroller" class="scrollable"><div id="piScrollerInner" class="scrollableInner"></div></div>');
        window.addEventListener('message', com.gsk.mt.slidePiHandler);
        com.gsk.mt.dom.body.append('<iframe id="piContentLoader" class="contentLoader" src="../shared/media/content/pi.html"></iframe>');
    },

    /**
     * Handle PI slide import
     * @param {Object} event
     */
    slidePiHandler: function(event) {
        var data;

        if (event.data !== undefined) {
            data = JSON.parse(event.data);
        }

        if (data.html_content !== undefined) {
            var iframe = $(".piContentLoader");
            $("#piScrollerInner").addClass("pi").html($.parseHTML(data.html_content));
            iframe.remove();
            if (parseInt($("#piScroller").css("height")) < parseInt($("#piScroller").find(".scrollableInner").css("height"))) {
                com.gsk.mt.initScroller($("#piScroller"));
            }
        } else {
            return;
        }

        // Clean up
        window.removeEventListener('message', com.gsk.mt.slidePiHandler);
    },

    /**
     * Create the dialog content for the Objection dialog
     */
    createQuickLinkObjection: function() {
        var $dialog = $("#quickLinkDialog"),
            dialogBody = $dialog.find(".dialogBody");

        dialogBody.append('<div class="quickLinkDialogContent quickLinkDialogObjection hidden"></div>');
        window.addEventListener('message', com.gsk.mt.embeddedObjectionHandler);
        com.gsk.mt.dom.body.append('<iframe id="objectionContentLoader" class="contentLoader" src="../shared/media/content/objection.html"></iframe>');
    },

    /**
     * Handle Objection popup import
     * @param {Object} event
     */
    embeddedObjectionHandler: function(event) {
        var data;

        if (event.data !== undefined) {
            data = JSON.parse(event.data);
        }

        if (data.objection_content !== undefined) {
            var iframe = $("#objectionContentLoader");
            $(".quickLinkDialogObjection").addClass("objection").html(data.objection_content);
            iframe.remove();
        } else {
            return;
        }

        // Clean up
        window.removeEventListener('message', com.gsk.mt.embeddedObjectionHandler);
    },

    /**
     * Initialise Objection slide
     */
    initObjection: function() {
        $(".mainContent").html('<div id="objectionScroller" class="scrollable"><div id="objectionScrollerInner" class="scrollableInner"></div></div>');
        window.addEventListener('message', com.gsk.mt.slideObjectionHandler);
        com.gsk.mt.dom.body.append('<iframe id="objectionContentLoader" class="contentLoader" src="../shared/media/content/objection.html"></iframe>');
    },

    /**
     * Handle Objection slide import
     * @param {Object} event
     */
    slideObjectionHandler: function(event) {
        var data;

        if (event.data !== undefined) {
            data = JSON.parse(event.data);
        }

        if (data.objection_content !== undefined) {
            var iframe = $(".objectionContentLoader");
            $("#objectionScrollerInner").addClass("objection").html(data.objection_content);
            iframe.remove();
            if (parseInt($("#objectionScroller").css("height")) < parseInt($("#objectionScroller").find(".scrollableInner").css("height"))) {
                com.gsk.mt.initScroller($("#objectionScroller"));
            }
        } else {
            return;
        }

        // Clean up
        window.removeEventListener('message', com.gsk.mt.slideObjectionHandler);
    },

    /**
     * Create the dialog content for the Guide dialog
     */
    createQuickLinkGuide: function() {
        var $dialog = $("#quickLinkDialog"),
            dialogBody = $dialog.find(".dialogBody");

        dialogBody.append('<div class="quickLinkDialogContent quickLinkDialogGuide hidden"></div>');
        window.addEventListener('message', com.gsk.mt.embeddedGuideHandler);
        com.gsk.mt.dom.body.append('<iframe id="guideContentLoader" class="contentLoader" src="../shared/media/content/' + com.gsk.mt.currentSlide + '_GUIDE.html"></iframe>');
    },

    /**
     * Handle Guide popup import
     * @param {Object} event
     */
    embeddedGuideHandler: function(event) {
        var data;

        if (event.data !== undefined) {
            data = JSON.parse(event.data);
        }

        if (data.guide_content !== undefined) {
            var iframe = $("#guideContentLoader");
            $(".quickLinkDialogGuide").addClass("guide").html(data.guide_content);
            iframe.remove();
        } else {
            return;
        }

        // Clean up
        window.removeEventListener('message', com.gsk.mt.embeddedGuideHandler);
    },

    /**
     * Initialise Guide slide
     */
    initGuide: function() {
        var prevSlide = window.sessionStorage.getItem('mtgskPreviousSlide'),
            guidePage = com.gsk.mtconfig.pagesGuides[prevSlide].slide;

        $(".mainContent").html('<div id="guideScroller" class="scrollable"><div id="guideScrollerInner" class="scrollableInner"></div></div>');
        window.addEventListener('message', com.gsk.mt.slideGuideHandler);
        com.gsk.mt.dom.body.append('<iframe id="guideContentLoader" class="contentLoader" src="../shared/media/content/' + guidePage + '.html"></iframe>');
    },

    /**
     * Handle PI slide import
     * @param {Object} event
     */
    slideGuideHandler: function(event) {
        var data;

        if (event.data !== undefined) {
            data = JSON.parse(event.data);
        }

        if (data.guide_content !== undefined) {
            var iframe = $(".guideContentLoader");
            $("#guideScrollerInner").addClass("guide").html($.parseHTML(data.guide_content));
            iframe.remove();
            if (parseInt($("#guideScroller").css("height")) < parseInt($("#guideScroller").find(".scrollableInner").css("height"))) {
                com.gsk.mt.initScroller($("#guideScroller"));
            }
        } else {
            return;
        }

        // Clean up
        window.removeEventListener('message', com.gsk.mt.slideGuideHandler);
    },

    /**
     * Initialise inline content
     * @param {Object} $element
     */
    initInlineContent: function($element) {
        var inlineContent = new Swiper(".inlineContent", {
            loop:false,
            resistance:'0%',
            initialSlide: 0,
            preventLinks: false,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            onTransitionStart: com.gsk.mt.inlineContentTransition,
            onTransitionEnd: com.gsk.mt.inlineContentTransition
        });
        $element.data("inlineContent", inlineContent);
        com.gsk.mt.trackInlineContent($element.find(".swiper-slide").eq(0));
    },

    /**
     * Handler for inline content transitions
     * @param {Object} $swiper
     */
    inlineContentTransition: function($swiper) {
        if ($swiper.swipeDirection === "prev" && $swiper.previousIndex === 0) {
            com.gsk.mt.gotoPreviousSlide();
        } else if ($swiper.swipeDirection === "next" && $swiper.previousIndex === $swiper.activeIndex) {
            com.gsk.mt.gotoNextSlide();
        }

        com.gsk.mt.trackInlineContent($($swiper.container["0"]).find(".swiper-slide").eq($swiper.activeIndex));
    },

    /**
     * Track an inline slide if it ha not yet been tracked
     * @param {Object} $element - Inline slide
     */
    trackInlineContent: function($element) {

        var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide),
            clickStreamArray = [
                {
                    Track_Element_Id_vod__c: com.gsk.mtconfig.pagesTitles[slideIndex],
                    Track_Element_Description_vod__c: $element.attr("data-description")
                }
            ],
            sessionItem = "inlineContent" + com.gsk.mt.currentSlide + $element.attr("data-description");

        if (window.sessionStorage.getItem(sessionItem) === null) {
            window.sessionStorage.setItem(sessionItem, true);
            com.gsk.mt.clickStreamSubmit(clickStreamArray);
        }

    },

    /**
     * Initialise tracking elements
     */
    initTracking: function() {
        $.each($(".slider:not(.dynamicFeedback)"), function() {
            com.gsk.mt.initTrackedSlider($(this));
        });

        var $logClick = $(".logClick");
        if ($logClick.length) {
            // Disable a logClick element if it has been previously clicked
            $.each($logClick, function() {
                var $this = $(this);
                if (window.sessionStorage.getItem($this.attr('id')) !== null) {
                    $this[0].disabled = true;
                    $this.attr("data-clicked", 1);
                }
            });

            com.gsk.mt.bindInteraction(".logClick", com.gsk.mt.releaseEvent, {}, function(e) {
                var $this = $(e.target);
                // If the element has not been clicked yet
                if ($this.attr("data-clicked") !== "1") {
                    // Log the click
                    com.gsk.mt.trackField($this, "");
                }
            });
        }

        var $logField = $(".logField");
        if ($logField.length) {
            $logField.change(function() {
                var $this = $(this),
                    type = $this.attr("type"),
                    tag = String($this.prop("tagName")).toLowerCase(),
                    answer = null;

                if (type === "checkbox") {
                    answer = $this.prop('checked') ? 'checked' : 'unchecked';
                } else if (type === "radio" || tag === "select") {
                    answer = $this.val();
                }

                com.gsk.mt.trackField($this, answer);
            });
        }

        if ($(".logFormSubmitAccount").length) {
            com.gsk.mt.bindInteraction(".logFormSubmitAccount", com.gsk.mt.releaseEvent, {}, function() {
                com.gsk.mt.formSubmitAccount();
            });
        }

        var $logFormSubmit = $(".logFormSubmit");
        if ($logFormSubmit.length) {
            // Disable element if it has been clicked
            $.each($logFormSubmit, function() {
                var $this = $(this);
                if (window.sessionStorage.getItem($this.attr('id')) !== null) {
                    $this[0].disabled = true;
                    $this.attr("data-clicked", 1);
                }
            });

            com.gsk.mt.bindInteraction(".logFormSubmit", com.gsk.mt.releaseEvent, {}, function(e) {
                var $this = $(e.target);
                if ($this.attr("data-clicked") !== "1") {
                    com.gsk.mt.formSubmit($this);
                }
            });
        }

        // If logged form fields are present try to retrieve the values
        if ($(".logFormField").length) {
            com.gsk.mt.retrieveFields();
        }

        var $logVideo = $(".logVideo");
        if ($logVideo.length) {
            var index = 0;
            // Videos managed by video.js
            $.each($logVideo, function () {
                var $this = $(this);

                com.gsk.mt.players.push(videojs($this.attr("id"), {controls: true}));

                com.gsk.mt.players[index].on("play", function () {
                    if (com.gsk.mt.currentVideo !== null) {
                        com.gsk.mt.currentVideo.pause();
                    }
                    com.gsk.mt.currentVideo = this;
                    com.gsk.mt.lastStartTime = new Date();
                    setTimeout(function () {
                        $this.addClass("started");
                    }, 500);
                });
                com.gsk.mt.players[index].on("pause", function () {
                    if (!com.gsk.mt.exitingSlide) {
                        if (com.gsk.mt.currentVideo === this) {
                            com.gsk.mt.currentVideo = null;
                        }
                        if ($this.hasClass("started")) {
                            com.gsk.mt.trackVideoEvent(this);
                        }
                    }
                });
                com.gsk.mt.players[index].on("ended", function () {
                    this.load();
                    $this.removeClass("started");
                });

                index++;
            });

            // Fix fastclick.
            $(".logVideo *").addClass("needsclick");
        }

        $(".sendFeedback").on(com.gsk.mt.releaseEvent, function() {
            com.gsk.mt.sendFeedback = true;
        });

        var $dynamicFeedback = $(".dynamicFeedback");
        $.each($dynamicFeedback, function() {
            var $element = $(this),
                feedback = window.sessionStorage.getItem("mtgskFeedback" + $element.attr("id"));

            if ($element.hasClass("slider")) {
                $element.slider({
                    min: parseInt($element.attr("data-min")),
                    max: parseInt($element.attr("data-max")),
                    step: parseInt($element.attr("data-step")),
                    value: parseInt($element.attr("data-value")),
                    start: function() {
                        com.gsk.mt.blockLinks = true;
                    },
                    stop: function() {
                        setTimeout(function() {
                            com.gsk.mt.blockLinks = false;
                        }, 250);
                    }
                });
            }

            if (feedback !== null) {
                if (com.gsk.mt.accountId === null) {
                    com.gsk.mt.accountId = window.sessionStorage.getItem("mtgskAccountId");
                }
                if ($element.is("[type=checkbox]") || $element.is("[type=radio]")) {
                    if (feedback === "true") {
                        $element.prop("checked", true);
                    } else {
                        $element.prop("checked", false);
                    }
                } else if ($element.hasClass("slider")) {
                    $element.slider("value", parseInt(feedback));
                } else {
                    $element.val(feedback);
                }
            } else {
                com.gsk.mt.cstreamStack.push($element);
            }
        });

        if (com.gsk.mt.cstreamStack.length > 0 && com.gsk.mt.isVeeva) {
            com.gsk.mt.getAccountIdForFeedback();
        }

        // Trigger data storage on slide transition
        window.addEventListener(com.gsk.mt.exitEvent, function() {
            com.gsk.mt.exitingSlide = true;
            return com.veeva.clm.createRecordsOnExit();
        });
    },

    /**
     * Initialise sub slides
     */
    initSubSlides: function() {
        if (com.gsk.mt.currentSlide === com.gsk.mtconfig.menu ||
            com.gsk.mt.currentSlide === com.gsk.mtconfig.references ||
            com.gsk.mt.currentSlide === com.gsk.mtconfig.pi)
        {
            return 0;
        }

        com.gsk.mt.subSlides = {
            root: null
        };

        $.each(com.gsk.mtconfig.subSlides, function(key, value) {
            for (var i = 0; i < value.length; i++) {
                if (value[i].slide === com.gsk.mt.currentSlide) {
                    com.gsk.mt.subSlides.root = key;
                    window.sessionStorage.setItem("mtgskSubSlideRoot", com.gsk.mt.subSlides.root);
                    com.gsk.mt.subSlides.slide = value;
                    window.sessionStorage.setItem("mtgskSubSlide", JSON.stringify(com.gsk.mt.subSlides.slide));
                }
            }
        });

        if (com.gsk.mt.subSlides.root === null) {
            return;
        }

        // Insert navigation elements
        com.gsk.mt.dom.container.append('<div class="navSubSlide"><div id="subSlideUp" class="gotoSlide"></div><div id="subSlideDown" class="gotoSlide"></div></div>');

        $(".navBumper").remove();

        var index = 0;
        for (var ii = 0; ii < com.gsk.mt.subSlides.slide.length; ii++) {
            if (com.gsk.mt.subSlides.slide[ii].slide === com.gsk.mt.currentSlide) {
                index = ii;
                break;
            }
        }
        if (index - 1 >= 0) {
            $("#subSlideUp").addClass("ssNavActive")
            .attr("data-slide", com.gsk.mt.subSlides.slide[index - 1].slide)
            .attr("data-presentation", com.gsk.mt.subSlides.slide[index - 1].presentation);
        }
        if (index + 1 < com.gsk.mt.subSlides.slide.length) {
            $("#subSlideDown").addClass("ssNavActive")
            .attr("data-slide", com.gsk.mt.subSlides.slide[index + 1].slide)
            .attr("data-presentation", com.gsk.mt.subSlides.slide[index + 1].presentation);
        }

        $('.ssNavActive').on(com.gsk.mt.pressEvent, function(e) {
            e.stopPropagation();
        });

        window.sessionStorage.setItem('mtgskPreviousSlide', com.gsk.mt.subSlides.slide[index].slide);
        window.sessionStorage.setItem('mtgskPreviousPres', com.gsk.mt.subSlides.slide[index].presentation);

        if (com.gsk.mt.subSlides.slide[index].presentation !== com.gsk.mtconfig.presentation) {
            if (com.gsk.mt.subSlides.slide[index].references !== undefined) {
                com.gsk.mt.slideReferences = com.gsk.mt.subSlides.slide[index].references;
                window.sessionStorage.setItem("mtgskSlideReferences", JSON.stringify(com.gsk.mt.slideReferences));
            } else {
                window.sessionStorage.setItem("mtgskSlideReferences", null);
            }
            if (com.gsk.mt.subSlides.slide[index].footnotes !== undefined) {
                com.gsk.mt.slideFootnotes = com.gsk.mt.subSlides.slide[index].footnotes;
                window.sessionStorage.setItem("mtgskSlideFootnotes", JSON.stringify(com.gsk.mt.slideFootnotes));
            } else {
                window.sessionStorage.setItem("mtgskSlideFootnotes", null);
            }
        }

        if ($(".navBottom div").length >= 7) {
            $(".navBottom div:nth-of-type(7n)").addClass("adjustForNav");
        }
    },

    /**
     * Initialise US specific elements
     */
    initUS: function() {
        com.gsk.mt.dom.body.addClass("includeISI");
        // Scroller is now managed by com.gsk.mt.initScrollable
    },

    /**
     * Initialise dialog windows (popups)
     */
    initDialogs: function() {
        if ($(".openDialog").length > 0) {
            $.widget("ui.dialog", $.ui.dialog, {
                open: function() {
                    var customMenuWrapper = $('#customMenuWrapper');
                    if (com.gsk.mtconfig.embedMenu && customMenuWrapper.length > 0 && customMenuWrapper.css("display") !== "none") {
                        customMenuWrapper.css("display", "none");
                    }

                    if (!com.gsk.mtconfig.enableSwipesOnDialog) {
                        com.gsk.mt.blockLinks = true;
                    } else {
                        if (!com.gsk.mt.isNoSwipe) {
                            com.gsk.mt.dom.container.removeClass("noSwipe");
                        }

                        com.gsk.mt.blockLinks = false;
                    }

                    // Prevent dialog from closing automatically
                    setTimeout(function() {
                        com.gsk.mt.blockClose = false;
                    }, 250);

                    if (com.gsk.mtconfig.enableSwipesOnDialog) {
                        com.gsk.mt.blockSwipes = false;
                    } else {
                        com.gsk.mt.blockSwipes = true;
                    }

                    return this._super();
                },
                close: function(e) {
                    if (com.gsk.mt.blockClose) {
                        return;
                    }
                    if ($(".ui-widget-overlay").length > 1) {
                        if (com.gsk.mtconfig.enableQuickLinksOnDialog) {
                            $(".navBottom").appendTo($(".ui-widget-overlay:nth-last-of-type(2)"));
                        }
                    } else {
                        if (com.gsk.mtconfig.enableQuickLinksOnDialog) {
                            $(".navBottom").appendTo("#container");
                        }
                        if (!com.gsk.mtconfig.enableSwipesOnDialog) {
                            com.gsk.mt.blockLinks = false;
                            com.gsk.mt.blockSwipes = false;
                        } else if (com.gsk.mt.isNoSwipe) {
                            com.gsk.mt.dom.container.addClass("noSwipe");
                        }
                    }

                    var $dialog = $(e.target).closest(".ui-dialog").find(".dialog");

                    com.gsk.mt.destroyDialogIscroll($dialog);

                    if (com.gsk.mt.onDialogClose !== undefined) {
                        com.gsk.mt.onDialogClose();
                    }

                    $(".quickLinkDialogContent").addClass("hidden");

                    com.gsk.mt.dialogStack.pop();
                    return this._super();
                }
            });

            $.each($(".openDialog"), function() {
                com.gsk.mt.initDialog($($(this).attr("data-dialog")));
                $(this).addClass("needsclick");
            });

            com.gsk.mt.bindInteraction(".openDialog", com.gsk.mt.releaseEvent, {}, function(e) {
				e.stopPropagation();
				e.preventDefault();
                if (com.gsk.mt.scrolling) {
                    return;
                }

                var $element = $(e.target);
                var quickLink = $element.attr("data-quicklink");
                if (quickLink === undefined && $element.hasClass("gotoRef")) {
                    quickLink = "References";
                }

                if (quickLink === "References" && !$(".quickLinkDialogReferences").hasClass("hidden")) {
                    return;
                }

                if (quickLink !== undefined) {
                    com.gsk.mt.processQuickLinkDialog(quickLink);
                    if (quickLink === "References") {
                        com.gsk.mt.processGotoRef($element);
                    }
                }

                if ($element.hasClass("logEmbedded") && !$element.hasClass("trackingSubmitted")) {
                    com.gsk.mt.trackQuickLink($element);
                }

                com.gsk.mt.openDialog($($element.attr("data-dialog")));
            });
        }
    },

    /**
     * Initialise scrollable (iScroll) elements
     */
    initScrollable: function() {
        var scrollable = $(".scrollable");

        if (scrollable.length > 0) {
            $.each(scrollable, function() {
                if (parseInt($(this).css("height")) < parseInt($(this).find(".scrollableInner").css("height"))) {
                    com.gsk.mt.initScroller($(this));
                }
            });
        }
    },

    /**
     * Initialise an iScroll scroller
     * @param {Object} $scroller
     */
    initScroller: function($scroller) {
        var currentDialogData = $scroller.data("gskmtIScroll");
        if (currentDialogData !== null && currentDialogData !== undefined) {
            currentDialogData.scrollTo(0, 0);
            currentDialogData.destroy();
            $scroller.data("gskmtIScroll", null);
        }


        var myScroll = new IScroll("#" + $scroller.attr("id"), {
            scrollbars: true,
            preventDefault: false
        });
        myScroll.on("scrollStart", function() {
            com.gsk.mt.scrolling = true;
        });
        myScroll.on("scrollCancel", function() {
            com.gsk.mt.scrolling = false;
        });
        myScroll.on("scrollEnd", function() {
            com.gsk.mt.scrolling = false;
        });
        $scroller.data("gskmtIScroll", myScroll);
    },

    /**
     * Initialise email system - only invoked if com.gsk.mtconfig.useEmail is true
     */
    initEmail: function() {
        com.gsk.mt.dom.email = $("#email");

        if (com.gsk.mtconfig.useEmail && com.gsk.mtconfig.pagesEmail[com.gsk.mt.currentSlide] !== undefined) {
            com.gsk.mt.dom.email.css('display', 'inline-block');
            com.gsk.mt.getSavedFragments();

            // If a custom fragment selector is in use, use that, otherwise
            // build the default one
            if (!com.gsk.mtconfig.customFragmentSelector) {
                com.gsk.mt.insertFragmentSelector();
            } else {
                com.gsk.mt.populateFragmentSelector();
            }
            var $fragmentSelector = $("#fragmentSelector");

            com.gsk.mt.fragmentCount();

            // Show fragment selector
            com.gsk.mt.bindInteraction("#email", com.gsk.mt.releaseEvent, {}, function() {
                $("#flowSelector").addClass("hidden");
                $("#quickLinkDialog").parent().find(".ui-dialog-titlebar-close").trigger("click");
                $fragmentSelector.toggleClass("hidden");
            });

            // Hide fragment selector
            com.gsk.mt.bindInteraction("#closeSelector", com.gsk.mt.releaseEvent, {}, function() {
                $fragmentSelector.addClass("hidden");
            });

            // Select or de-select fragment
            com.gsk.mt.bindInteraction(".fragmentOption", com.gsk.mt.releaseEvent, {}, function(e) {
                com.gsk.mt.toggleFragment($(e.target));
            });
        } else if (com.gsk.mtconfig.useEmail && com.gsk.mt.dom.email.hasClass("sendEmail")) {
            com.gsk.mt.dom.email.css('display', 'inline-block');
            // Send email button overrides the functionality presented on other
            // slides and will now activate approved email
            com.gsk.mt.getSavedFragments();
            if (com.gsk.mt.emailFragments.length > 0) {
                com.gsk.mt.fragmentCountFinal();
                com.gsk.mt.dom.email.addClass("active");

                // Bind email button to sendEmail
                com.gsk.mt.bindInteraction("#email", com.gsk.mt.releaseEvent, {}, function(e) {
                    com.gsk.mt.sendEmail($(e.target));
                });
            } else {
                // Email does not apply to this slide
                com.gsk.mt.dom.email.addClass("inactive");
            }
        } else if (com.gsk.mtconfig.useEmail) {
            com.gsk.mt.dom.email.css('display', 'inline-block');
            com.gsk.mt.dom.email.addClass("inactive");
        }
    },

    isAddSlide: function() {
        return com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide) < 0;
    },

    isSubSlide: function() {
        var subSlides = window.sessionStorage.getItem("mtgskSubSlide");

        if (subSlides !== null && subSlides !== undefined) {
            subSlides = JSON.parse(subSlides);
            for (var ii = 0; ii < subSlides.length; ii++) {
                if (com.gsk.mt.currentSlide === subSlides[ii].slide) {
                    return true;
                }
            }
        }

        return false;
    },

    /**
     * Initialise references
     */
    initReferences: function() {
        if (com.gsk.mt.isAddSlide() && com.gsk.mt.currentSlide !== com.gsk.mtconfig.references) {
            if (com.gsk.mtconfig.embedReferences) {
                com.gsk.mt.slideReferences = JSON.parse(window.sessionStorage.getItem("mtgskSlideReferences"));
                com.gsk.mt.slideFootnotes = JSON.parse(window.sessionStorage.getItem("mtgskSlideFootnotes"));
                com.gsk.mt.slideRefTarget = window.sessionStorage.getItem("mtgskSlideRefTarget");

                var $references = $(".gotoRef");

                $references.addClass("openDialog")
                .removeClass("gotoSlide")
                .attr("data-dialog", "#quickLinkDialog");
            }
        } else if (com.gsk.mt.currentSlide === com.gsk.mtconfig.references) {
            var referenceSourceQuickLink = JSON.parse(window.sessionStorage.getItem("mtgskReferenceSourceQuickLink")),
                refTarget = window.sessionStorage.getItem("mtgskSlideRefTarget") !== null,
                $refButtons = com.gsk.mt.currentSlide === com.gsk.mtconfig.references ? $("#referencesPage, #referencesAll") : $("#quickLinkDialog");
            if (referenceSourceQuickLink) {
                $refButtons.removeClass("customRefs");
            } else if (refTarget || com.gsk.mtconfig.embedReferences) {
                $refButtons.addClass("customRefs");
            }
            com.gsk.mt.slideReferences = JSON.parse(window.sessionStorage.getItem("mtgskSlideReferences"));
            com.gsk.mt.slideFootnotes = JSON.parse( window.sessionStorage.getItem("mtgskSlideFootnotes"));
            com.gsk.mt.slideRefTarget = window.sessionStorage.getItem("mtgskSlideRefTarget");

            if (com.gsk.mt.slideRefTarget !== null) {
                com.gsk.mt.slideRefTarget = JSON.parse(com.gsk.mt.slideRefTarget);
                com.gsk.mt.doReferences("REFTARGET");
            } else {
                com.gsk.mt.doReferences("PAGE");
            }
        } else {
            com.gsk.mt.slideReferences = com.gsk.mt.getReferencesForSlide(com.gsk.mt.currentSlide);
            window.sessionStorage.setItem("mtgskSlideReferences", JSON.stringify(com.gsk.mt.slideReferences));
            com.gsk.mt.slideFootnotes = com.gsk.mt.getFootnotesForSlide(com.gsk.mt.currentSlide);
            window.sessionStorage.setItem("mtgskSlideFootnotes", JSON.stringify(com.gsk.mt.slideFootnotes));

            if (com.gsk.mtconfig.embedReferences) {
                $(".gotoRef").addClass("openDialog")
                .removeClass("gotoSlide")
                .attr("data-dialog", "#quickLinkDialog");
            } else {
                window.sessionStorage.removeItem("mtgskSlideRefTarget");
            }
        }

        if (!com.gsk.mtconfig.embedReferences) {
            com.gsk.mt.bindInteraction(".gotoRef", com.gsk.mt.pressEvent, {}, function(e) {
                e.stopPropagation();
                com.gsk.mt.blockClose = true;
                com.gsk.mt.processGotoRef($(e.target));
            });
        }

        com.gsk.mt.bindInteraction("#referencesPage", com.gsk.mt.releaseEvent, {}, function() {
            if (com.gsk.mt.slideRefTarget !== null) {
                com.gsk.mt.doReferences("REFTARGET");
            } else {
                com.gsk.mt.doReferences("PAGE");
            }
        });

        com.gsk.mt.bindInteraction("#referencesAll", com.gsk.mt.releaseEvent, {}, function() {
            com.gsk.mt.doReferences("ALL");
        });
    },

    /* Debugging */

    /**
     * Trigger a console message if the presentation is running in a desktop browser
     * @param {string} message
     */
    debug: function(message) {
        if (!com.gsk.mt.isVeeva) {
            console.log(message);
        }
    },

    /**
     * Detect whether the presentation is running in a browser (excluding Engage)
     * @returns {boolean}
     */
    isVeevaEnvironment: function() {
        if (navigator.userAgent.match(/iPad/i) !== null ||
            navigator.userAgent.match(/iPhone/i) !== null) {
            return true;
        }

        var isIE = (/*@cc_on!@*/false || !!document.documentMode),
            isChrome = (!!window.chrome && !!window.chrome.webstore),
            isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 ||
                !isChrome && window.webkitAudioContext !== undefined;
        if (typeof InstallTrigger !== 'undefined' || // Firefox
            isSafari || // Safari
            isIE || // IE
            (!isIE && !!window.StyleMedia) || // Edge
            isChrome) // Chrome
        {
            return com.veeva.clm.isEngage();
        }
        return true;
    },

    /**
     * Set the environment depending upon whether com.gsk.mt.isVeeva is true or false
     */
    setEnvironment: function() {
        if (com.gsk.mt.isVeeva) {
            com.gsk.mt.isEngage     = com.veeva.clm.isEngage();
            com.gsk.mt.extension    = ".zip";
            com.gsk.mt.pressEvent   = "touchstart";
            com.gsk.mt.releaseEvent = "touchend";

            if ($(".zincCode").length > 0) {
                com.gsk.mt.getZincCode();
            }

            com.gsk.mt.fastClick = Origami.fastclick;
            com.gsk.mt.fastClick(document.getElementById("container"));
        }
    },

    /**
     * Populate the Zinc code
     */
    getZincCode: function() {
        var fallback = $(".zincCode").html();
        com.gsk.mt.readField("Presentation", "CORE_GSK_Zinc_ID__c", fallback, ".zincCode");
    },

    /* Interaction */

    /**
     * Bind interaction to an element - helper function for binding interactions
     * to an element: necessary to maintain abstraction!
     * @param {string} element
     * @param {string} eventType
     * @param {Object} options
     * @param {function} callback
     */
    bindInteraction: function(element, eventType, options, callback) {

        var $element = $(element);
        options.domEvents = true;
        options.touchAction = 'auto';
        if ($element === null) { return; }

        if (element === "#container") {
            com.gsk.mt.dom.container.hammer(options).on(eventType, function(e) {
                callback(e);
            });
        } else {
            com.gsk.mt.dom.body.hammer(options).on(eventType, element, function(e) {
                // Prevent ghost clicks.
                var eventTimeStamp = e.timeStamp,
                    elementTimeStamp = $(e.currentTarget).data("hammerTimeStamp");

                $(e.currentTarget).data("hammerTimeStamp", eventTimeStamp);

                if (elementTimeStamp !== undefined && eventTimeStamp - elementTimeStamp < 20) {
                    // Ghost click
                    return;
                }

                callback(e);
            });
        }
    },

    /**
     * Bind swipe to an element - helper function for binding swipes
     * to an element: necessary to maintain abstraction!
     * @param {string} element
     * @param {Object} options
     * @param {function} callback
     */
    bindSwipe: function(element, options, callback) {
        options.touchAction = 'auto';
        var hammerSwipe = new Hammer(document.getElementById("container"), options);

        if (options.direction !== undefined) {
            hammerSwipe.get('swipe').set({ direction: options.direction });
        }

        hammerSwipe.on("swipe", callback);
        $(element).data("hammer", hammerSwipe);
    },

    /* Navigation */

    /**
     * Gets the current flow for the presentation
     * @returns {number} Current flow
     */
    getCurrentFlow: function() {
        if (window.sessionStorage.getItem("mtgskPortfolioLinked") !== null) {
            window.sessionStorage.removeItem("mtgskPortfolioLinked");
            window.sessionStorage.removeItem('mtgskFlows');
        }
        
        var currentFlow = window.sessionStorage.getItem('mtgskCurrentFlow'),
            flows = window.sessionStorage.getItem('mtgskFlows'),
            main = [];

        // Initialise flows if session variable is not set
        if (flows === null) {
            if (com.gsk.mtconfig.flows.Main === undefined) {
                for (var ii = 0; ii < com.gsk.mtconfig.pagesAll.length; main.push(ii), ii++);
                com.gsk.mtconfig.flows.Main = main;
            }

            window.sessionStorage.setItem('mtgskFlows', JSON.stringify(com.gsk.mtconfig.flows));
            flows = com.gsk.mtconfig.flows;
        } else {
            flows = JSON.parse(flows);
            com.gsk.mtconfig.flows = flows;
        }


        if (currentFlow === null || flows[currentFlow] === undefined) {
            currentFlow = "Main";
        }

        var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide);

        if (slideIndex > -1 && flows[currentFlow].indexOf(slideIndex) < 0) {
            currentFlow = "Main";
        }

        window.sessionStorage.setItem('mtgskCurrentFlow', currentFlow);

        return currentFlow;
    },

    /**
     * Insert the flow selector markup including flows
     */
    insertFlowSelector: function(keys) {
        var selectorHTML = '<div id="flowSelector" class="hidden"><div id="flowSelectorInner">' +
            '<div id="closeFlowSelector"></div>';

        for (var ii = 0; ii < keys.length; ii++) {
            var flowLabel = keys[ii].replace("_", " ");

            if (com.gsk.mt.currentFlow === keys[ii]) {
                selectorHTML += '<div class="flowSelect gskFlowSelected">' + flowLabel + '</div>';
            } else {
                selectorHTML += '<div class="flowSelect gotoFlow" data-flow="' + keys[ii] + '">' + flowLabel + '</div>';
            }
        }
        selectorHTML += '</div><div class="selectorTriangle"></div></div>';
        com.gsk.mt.dom.container.append(selectorHTML);
    },

    /**
     * Gets the current slide in the presentation
     * @returns {string} Current slide
     */
    getCurrentSlide: function() {
        var parser = document.createElement('a');
        parser.href = window.location.href.replace("/index.html", "");
        return String(parser.pathname).substring(
            parser.pathname.lastIndexOf('/') + 1);
    },

    /**
     * Gets the current presentation
     * @returns {string} Current presentation
     */
    getCurrentPres: function() {
        var uriArray = window.location.href.split("/");
        return uriArray[uriArray.length - 3];
    },

    /**
     * Gets the previous slide in the presentation if not at the first slide
     * @returns {string} Previous slide
     */
    getPreviousSlide: function() {
        var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide),
            flow = com.gsk.mtconfig.flows[com.gsk.mt.currentFlow];

        var slideFlowIndex = flow.indexOf(slideIndex);
        if (slideIndex > -1 && slideFlowIndex < 0) {
            flow = com.gsk.mtconfig.flows["Main"];
            window.sessionStorage.setItem("mtgskCurrentFlow", "Main");
            slideFlowIndex = flow.indexOf(slideIndex);
            if (slideFlowIndex <= 0) {
                return com.gsk.mtconfig.pagesAll[flow[slideFlowIndex]];
            } else {
                return com.gsk.mtconfig.pagesAll[flow[slideFlowIndex - 1]];
            }
        } else if (slideFlowIndex === 0) {
            return com.gsk.mtconfig.pagesAll[flow[slideFlowIndex]];
        } else {
            return com.gsk.mtconfig.pagesAll[flow[slideFlowIndex - 1]];
        }
    },

    /**
     * Gets the next slide in the presentation if not at the last slide
     * @returns {string} Next slide
     */
    getNextSlide: function() {
        var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide),
            flow = com.gsk.mtconfig.flows[com.gsk.mt.currentFlow];

        var slideFlowIndex = flow.indexOf(slideIndex);
        if (slideIndex > -1 && slideFlowIndex < 0) {
            flow = com.gsk.mtconfig.flows["Main"];
            window.sessionStorage.setItem("mtgskCurrentFlow", "Main");
            slideFlowIndex = flow.indexOf(slideIndex);
            if (slideFlowIndex + 1 >= flow.length) {
                return com.gsk.mtconfig.pagesAll[flow[slideFlowIndex]];
            } else {
                return com.gsk.mtconfig.pagesAll[flow[slideFlowIndex + 1]];
            }
        }
        if (slideFlowIndex + 1 >= flow.length) {
            return com.gsk.mt.currentSlide;
        } else {
            return com.gsk.mtconfig.pagesAll[flow[slideFlowIndex + 1]];
        }
    },

    /**
     * Go to the next slide in the presentation
     */
    gotoNextSlide: function() {
        if (com.gsk.mt.blockLinks) { return; }

        com.gsk.mt.debug("Going to slide " + com.gsk.mt.nextSlide);
        if (com.gsk.mt.isVeeva) {
            com.gsk.mt.gotoSlide(com.gsk.mt.nextSlide);
        } else {
            document.location.href = com.gsk.mt.buildUrl(com.gsk.mt.nextSlide);
        }
    },

    /**
     * Go to the previous slide in the presentation
     */
    gotoPreviousSlide: function() {
        if (com.gsk.mt.blockLinks) { return; }

        com.gsk.mt.debug("Going to slide " + com.gsk.mt.previousSlide);
        if (com.gsk.mt.isVeeva) {
            com.gsk.mt.gotoSlide(com.gsk.mt.previousSlide);
        } else {
            document.location.href = com.gsk.mt.buildUrl(com.gsk.mt.previousSlide);
        }
    },

    /**
     * Go to the specified slide/presentation
     * @param {string} slide
     * @param {string} [presentation]
     */
    gotoSlide: function(slide, presentation) {
        if (!slide || com.gsk.mt.blockLinks) return;

        if (presentation !== "" && presentation !== undefined) {
            com.gsk.mt.debug("Going to slide " + presentation + "/" + slide);
        } else {
            com.gsk.mt.debug("Going to slide " + slide);
        }

        if (com.gsk.mt.isVeeva) {
            com.veeva.clm.gotoSlide(slide + com.gsk.mt.extension, presentation);
        } else {
            document.location.href = com.gsk.mt.buildUrl(slide, presentation);
        }
    },

    /**
     * Offline workaround to allow linking to assets without an index.html file
     * @param {string} type Type of asset - 'pdf' or 'video'
     * @param {string} slide
     * @param {string} [presentation]
     */
    gotoAsset: function(type, slide, presentation) {
        if (com.gsk.mt.isVeeva || !type || !slide) return;

        var format = (type === "pdf") ? "pdf" : "mp4";
        if (presentation !== null && presentation !== "" && presentation !== undefined) {
            com.gsk.mt.debug("Going to slide " + presentation + "/" + slide);
            document.location.href = "../../" + presentation + "/" + slide + "/" + type + "." + format;
        } else {
            com.gsk.mt.debug("Going to slide " + slide);
            document.location.href = "../" + slide + "/" + type + "." + format;
        }
    },

    /**
     * Construct a url for gotoSlide
     * @param {string} slide
     * @param {string} [presentation]
     */
    buildUrl: function(slide, presentation) {
        var url = presentation ? "../../" + presentation + "/" : "../";
        return url + slide + "/index" + com.gsk.mt.extension;
    },

    /**
     * Return to the stored slide
     */
    closeSlide: function() {
        var previousSlide = window.sessionStorage.getItem('mtgskPreviousSlide'),
            previousPres = window.sessionStorage.getItem('mtgskPreviousPres');
        com.gsk.mt.gotoSlide(previousSlide, previousPres);
    },

    /**
     * Process the gotoSlide call and pass relevant params to gotoSlide or in
     * the case of assets, gotoAsset
     * @param {Object} $element
     */
    processGotoSlide: function($element) {
        var slide = $element.attr("data-slide"),
            presentation = $element.attr("data-presentation");

        if ($element.hasClass("logged")) {
            // Track a gotoSlide link
            com.gsk.mt.trackedLink = $element;
        }

        if (slide === "prev") {
            // Go to the previous slide
            com.gsk.mt.gotoPreviousSlide();
        } else if (slide === "next") {
            // Go to the next slide
            com.gsk.mt.gotoNextSlide();
        } else if ($element.attr("data-type") !== undefined && !com.gsk.mt.isVeeva) {
            // In order to enable offline transition to assets a function has
            // been created to handle this. This will only be invoked offline
            com.gsk.mt.gotoAsset($element.attr("data-type"), slide, presentation);
        } else if (slide !== undefined) {
            // A standard gotoSlide event
            com.gsk.mt.gotoSlide(slide, presentation);
        } else if (com.gsk.mtconfig[$element.attr("id")] !== undefined) {
            // Process nav button gotoSlide
            var refTargets = $("[data-reftarget]:not([data-reftarget=PAGE],[data-reftarget=ALL])");
            if ($element.attr("id") === "references" && refTargets.length > 0) {
                com.gsk.mt.slideRefTarget = com.gsk.mt.concatRefTargets(refTargets);
                window.sessionStorage.setItem("mtgskSlideRefTarget", JSON.stringify(com.gsk.mt.slideRefTarget));
                window.sessionStorage.setItem("mtgskReferenceSourceQuickLink", true);
            }

            slide = com.gsk.mtconfig[$element.attr("id")];
            presentation = com.gsk.mtconfig[$element.attr("id")+"Presentation"];
            com.gsk.mt.gotoSlide(slide, presentation);
        } else if ($element.attr("id") === "home") {
            // Process home button gotoSlide - uses values different from those
            // found in the config file.

            var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mtconfig.homepage);

            com.gsk.mt.currentFlow = window.sessionStorage.getItem('mtgskCurrentFlow');

            if (com.gsk.mtconfig.homeResetsFlows) {
                window.sessionStorage.setItem('mtgskCurrentFlow', "Main");
                com.gsk.mt.currentFlow = "Main";
            }

            com.gsk.mt.gotoFlowHome();
        }
    },

    /**
     * Go to the homepage or the first slide in the flow if the homepage is not in the flow
     */
    gotoFlowHome: function() {
        var slide = com.gsk.mtconfig.pagesAll[com.gsk.mtconfig.flows[com.gsk.mt.currentFlow][0]];

        if (com.gsk.mt.currentFlow === "Main") {
            slide = com.gsk.mtconfig.homepage;
        }

        com.gsk.mt.gotoSlide(slide, com.gsk.mtconfig.presentation);
    },

    /**
     *
     * @param destinations
     * @param direction
     */
    processCustomSwipe: function(destinations, direction) {
        if (destinations[direction + "Flow"] !== undefined) {
            if (com.gsk.mtconfig.flows[destinations[direction + "Flow"]] !== undefined) {
                window.sessionStorage.setItem('mtgskCurrentFlow', destinations[direction + "Flow"]);
            } else {
                com.gsk.mt.debug("Flow index (" + destinations[direction + "Flow"] + ") out of range");
            }
        }
        com.gsk.mt.gotoSlide(destinations[direction + "Slide"], destinations[direction + "Pres"]);
    },

    /**
     * Process the gotoRefs call and pass relevant params to gotoSlide if references
     * are not embedded or the references popup if they are
     * @param {Object} $element
     */
    processGotoRef: function($element) {

        var refs = $element.attr("data-reftarget"),
            refTargets = $("[data-reftarget]:not([data-reftarget=PAGE],[data-reftarget=ALL])");

        if ($element.attr("id") === "references") {
            window.sessionStorage.setItem("mtgskReferenceSourceQuickLink", true);
        } else {
            window.sessionStorage.setItem("mtgskReferenceSourceQuickLink", false);
        }

        if (refs === null || refs === undefined) {
            com.gsk.mt.slideRefTarget = null;
            refs = "PAGE";
            window.sessionStorage.removeItem("mtgskSlideRefTarget");
        } else if (refs !== "PAGE" && refs !== "ALL") {
            com.gsk.mt.slideRefTarget = {
                references: refs.split(","),
                indices   : com.gsk.mt.processCustomReferenceIndices($element.html().split(","))
            };
            refs = "REFTARGET";
            window.sessionStorage.setItem("mtgskSlideRefTarget", JSON.stringify(com.gsk.mt.slideRefTarget));
        } else if (refs === "PAGE" && refTargets.length > 0) {
            com.gsk.mt.slideRefTarget = com.gsk.mt.concatRefTargets(refTargets);
            window.sessionStorage.setItem("mtgskSlideRefTarget", JSON.stringify(com.gsk.mt.slideRefTarget));
        } else {
            com.gsk.mt.slideRefTarget = null;
            window.sessionStorage.setItem("mtgskSlideRefTarget", refs);
        }

        if (com.gsk.mtconfig.embedReferences) {
            com.gsk.mt.doReferences(refs);
        } else {
            com.gsk.mt.gotoSlide(com.gsk.mtconfig.references, com.gsk.mtconfig.referencesPresentation);
        }
    },

    /**
     * Toggle portrait mode
     */
    resizePortrait: function() {
        var $doubleClickCentre = $("#doubleClickCentre");
        if ($doubleClickCentre.attr("data-toggle") !== "1") {
            $doubleClickCentre.attr("data-toggle", 1);
            setTimeout(function() {
                $doubleClickCentre.attr("data-toggle", 0);
            }, 1000);
            if (com.gsk.mt.dom.body.hasClass("portraitActive")) {
                com.gsk.mt.dom.body.removeClass("portraitActive");
            } else {
                com.gsk.mt.dom.body.addClass("portraitActive");
            }
        }
    },

    /**
     * Process the gotoFlow call and pass relevant params to processGotoSlide
     * @param {Object} $element
     */
    processGotoFlow: function($element) {
        var flows = com.gsk.mtconfig.flows,
            flow = $element.attr("data-flow");

        if (flows === undefined) {
            return;
        }

        if (flow !== undefined) {
            if (com.gsk.mtconfig.flows[flow] !== undefined) {
                com.gsk.mt.currentFlow = flow;
                window.sessionStorage.setItem('mtgskCurrentFlow', flow);

                var slideIndex = com.gsk.mtconfig.flows[flow][0],
                    slide = com.gsk.mtconfig.pagesAll[slideIndex];

                if ($element.attr("data-slide") === undefined) {
                    $element.attr("data-slide", slide);
                }
                if ($element.attr("data-presentation") === undefined) {
                    $element.attr("data-presentation", com.gsk.mtconfig.presentation);
                }
                $element.addClass("gotoSlide");
                $("#flowSelector").addClass("hidden");
                com.gsk.mt.processGotoSlide($element);
            } else {
                com.gsk.mt.debug("Flow index (" + flow + ") out of range");
            }
        }
    },

    /**
     * Set up a quicklink dialog.
     * @param {string} quickLink - Menu|references|Pi
     */
    processQuickLinkDialog: function(quickLink) {
        if (quickLink === "References") {
            $(".referenceSelector").removeClass("hidden");
        } else {
            $(".referenceSelector").addClass("hidden");
        }

        $(".quickLinkDialogContent").addClass("hidden");
        var $dialog = $("#quickLinkDialog"),
            container = $(".quickLinkDialog" + quickLink),
            dialogBody = $dialog.find(".dialogBody");
        container.removeClass("hidden");
        if (quickLink === "Pi" && container.hasClass("framed")) {
            dialogBody.css("height", $dialog.css("height"));
        } else {
            dialogBody.css("height", "auto");
            dialogBody.css("min-height", $dialog.css("height"));
        }
        com.gsk.mt.rebuildDialogIscroll($dialog);
    },

    /* References */

    /**
     * Gets the references for the current slide in the presentation
     * @param {string} slide
     * @returns {Object} References
     */
    getReferencesForSlide: function(slide) {
        var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(slide);
        return com.gsk.mtconfig.pageReferencesAll[slideIndex];
    },

    /**
     * Gets the footnotes for the current slide in the presentation
     * @param {string} slide
     * @returns {Object} References
     */
    getFootnotesForSlide: function(slide) {
        var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(slide);
        return com.gsk.mtconfig.pageFootnotesAll[slideIndex];
    },

    /**
     * Process a custom reference target
     * @param {Array} referenceIndices
     * @returns {Array}
     */
    processCustomReferenceIndices: function(referenceIndices) {
        var indices = [];
        for (var ii = 0; ii < referenceIndices.length; ii++) {
            if (referenceIndices[ii].indexOf("-") > -1) {
                // Split reference range: "2-4" becomes "2,3,4"
                var range = referenceIndices[ii].split("-");
                if (range.length !== 2) {
                    com.gsk.mt.debug("Error processing custom reference target [" +
                        referenceIndices.join(",") + "]: Reference range [" +
                        referenceIndices[ii] + "] is invalid!");
                } else {
                    for (var iii = parseInt(range[0]); iii <= parseInt(range[1]); iii++) {
                        indices.push(iii);
                    }
                }
            } else {
                indices.push(referenceIndices[ii]);
            }
        }

        return indices;
    },

    /**
     * Build the references page
     * @param {string} type 'page' or 'all'
     */
    doReferences: function(type) {
        var references = com.gsk.mt.slideReferences,
            footnotes = com.gsk.mt.slideFootnotes,
            refTargets = $("[data-reftarget]:not([data-reftarget=PAGE],[data-reftarget=ALL])"),
            referenceSourceQuickLink = JSON.parse(window.sessionStorage.getItem("mtgskReferenceSourceQuickLink")),
            $refButtons = com.gsk.mt.currentSlide === com.gsk.mtconfig.references ? $("#referencesPage, #referencesAll") : $("#quickLinkDialog");

        if (referenceSourceQuickLink) {
            $refButtons.removeClass("customRefs");
        } else if (type === "REFTARGET") {
            $refButtons.addClass("customRefs");
        }

        if (type === "REFTARGET") {
            com.gsk.mt.buildCustomReferences(com.gsk.mt.slideRefTarget);
        } else if (type === "PAGE" && refTargets.length > 0) {
            com.gsk.mt.slideRefTarget = com.gsk.mt.concatRefTargets(refTargets);
            com.gsk.mt.buildCustomReferences(com.gsk.mt.slideRefTarget);
        } else if (type === "PAGE" && com.gsk.mt.slideRefTarget !== null) {
            com.gsk.mt.buildCustomReferences(com.gsk.mt.slideRefTarget);
        } else { // type === "ALL" || type === "PAGE"
            if (type === "ALL") {
                references = com.gsk.mtconfig.referencesAll;
                footnotes = com.gsk.mtconfig.footnotesAll;
            }
            com.gsk.mt.buildReferences(references, footnotes, type);
        }

        if (com.gsk.mtconfig.embedReferences) {
            com.gsk.mt.rebuildDialogIscroll($("#quickLinkDialog"));
        }
    },

    /**
     * Concatenate all custom references on the slide.
     * @param {Object} refTargets
     * @returns {{references: Array, indices: Array}}
     */
    concatRefTargets: function(refTargets) {
        var refBuffer = [],
            buffer = [],
            slideRefTarget = {
                references: [],
                indices: []
            };

        $.each(refTargets, function() {
            var references = $(this).attr("data-reftarget").split(","),
                indices = $(this).html().split(",");

            indices = com.gsk.mt.processCustomReferenceIndices(indices);

            for (var ii = 0; ii < references.length; ii++) {
                if (refBuffer.indexOf(references[ii]) === -1) {
                    buffer.push({
                        reference: references[ii],
                        index: indices[ii]
                    });
                    refBuffer.push(references[ii]);
                }
            }
        });

        buffer.sort(function(a, b) {
            if (("" + a.reference).indexOf("foot_") > -1) {
                return 1;
            }
            if (("" + b.reference).indexOf("foot_") > -1) {
                return -1;
            }

            var aIndex = parseInt(a.index),
                bIndex = parseInt(b.index);
            return ((aIndex < bIndex) ? -1 : ((aIndex === bIndex) ? 0 : 1));
        });

        for (var ii = 0; ii < buffer.length; ii++) {
            slideRefTarget.references.push(buffer[ii].reference);
            slideRefTarget.indices.push(buffer[ii].index);
        }

        return slideRefTarget;
    },

    /**
     * Build custom references
     * @param {Object} refTarget
     */
    buildCustomReferences: function(refTarget) {
        var $referenceList = $("#referenceList"),
            $footnotesList = $("#footnotesList");
        $referenceList.empty();
        $footnotesList.empty();

        $referenceList.removeClass("unindexed");

        if (refTarget.references.length !== refTarget.indices.length) {
            com.gsk.mt.debug("Error building custom reference target: references = [" +
                refTarget.references.join(",") + "], indices = [" + refTarget.indices.join(",") +
                "] - reference and indices are not equal sizes! Check values of reference ranges (eg. 2-4)");
            return;
        }

        for (var ii = 0; ii < refTarget.references.length; ii++) {
            if (refTarget.references[ii].indexOf("foot_") > -1) {
                var footnote = parseInt(refTarget.references[ii].substring(5));
                $footnotesList.append('<li class="footnoteActive">' +
                    com.gsk.mtconfig.footnotesAll[footnote - 1] + '</li>');
            } else {
                var reference = parseInt(refTarget.references[ii]);
                $referenceList.append('<li class="referenceActive hasRefIndex"><span class="refIndex">' +
                    refTarget.indices[ii] + '.</span>' +
                    com.gsk.mtconfig.referencesAll[reference - 1] + '</li>');
            }
        }
    },

    /**
     * Build the references page
     * @param {Array} references
     * @param {Array} footnotes
     * @param {string} type
     */
    buildReferences: function(references, footnotes, type) {
        type = type || "PAGE";

        var $referenceList = $("#referenceList"),
            $footnotesList = $("#footnotesList");
        $referenceList.empty();
        $footnotesList.empty();

        if (type === "ALL") {
            $referenceList.addClass("unindexed");
        } else {
            $referenceList.removeClass("unindexed");
        }

        if (references === null || references === undefined) {
            for(ii = 0; ii < com.gsk.mtconfig.referencesAll.length; ii++) {
                $referenceList.append('<li class="referenceInactive">' +
                    com.gsk.mtconfig.referencesAll[ii] +
                    '</li>');
            }
        } else {
            for(var ii = 0; ii < com.gsk.mtconfig.referencesAll.length; ii++) {
                if ($.inArray(ii + 1, references) !== -1 || type === 'ALL')
                {
                    $referenceList.append('<li class="referenceActive">' +
                        com.gsk.mtconfig.referencesAll[ii] + '</li>');
                } else if ($.inArray(ii + 1, references) === -1) {
                    $referenceList.append('<li class="referenceInactive">' +
                        com.gsk.mtconfig.referencesAll[ii] + '</li>');
                } else {
                    $referenceList.append('<li class="referenceActive">' +
                        com.gsk.mtconfig.referencesAll[ii] + '</li>');
                }
            }
        }

        $(".footnotes").removeClass("footnotesEmpty");

        if ((footnotes === null || footnotes === undefined || footnotes.length < 1) && type !== "ALL") {
            $(".footnotes").addClass("footnotesEmpty");
        } else {
            for(var ii = 0; ii < com.gsk.mtconfig.footnotesAll.length; ii++) {
                if ($.inArray(ii + 1, footnotes) !== -1 || type === "ALL") {
                    $footnotesList.append('<li class="footnoteActive">' +
                        com.gsk.mtconfig.footnotesAll[ii] + '</li>');
                }
            }
        }
    },

    /* RWops */

    /**
     * Get the account ID
     */
    getAccountIdForFeedback: function() {
        var accountId = window.sessionStorage.getItem("mtgskAccountId");

        if (accountId !== null) {
            com.gsk.mt.accountId = accountId;
            com.gsk.mt.getPresentationIdForFeedback();
            return;
        }

        com.veeva.clm.getDataForCurrentObject("Account", "Id", function(result) {
            if (result.success) {
                com.gsk.mt.accountId = result.Account.Id;
                window.sessionStorage.setItem("mtgskAccountId", com.gsk.mt.accountId);
                com.gsk.mt.getPresentationIdForFeedback();
            }
        });
    },

    /**
     * Get the presentation ID
     */
    getPresentationIdForFeedback: function() {
        var presentationId = window.sessionStorage.getItem("mtgskPresentationId");

        if (presentationId !== null) {
            com.gsk.mt.presentationId = presentationId;
            com.gsk.mt.getCalls();
            return;
        }

        com.veeva.clm.getDataForCurrentObject("Presentation", "Presentation_Id_vod__c", function(result) {
            if (result.success) {
                com.gsk.mt.presentationId = result.Presentation.Presentation_Id_vod__c;
                window.sessionStorage.setItem("mtgskPresentationId", com.gsk.mt.presentationId);
                com.gsk.mt.getCalls();
            }
        });
    },

    /**
     * Get the 10 most recent calls for the current account
     */
    getCalls: function() {
        com.veeva.clm.queryRecord(
            "Call2_vod__c",
            "Name,Account_vod__c,Id,Call_Datetime_vod__c",
            "WHERE Account_vod__c='" + com.gsk.mt.accountId + "'",
            ["Call_Datetime_vod__c, DESC"],
            10,
            com.gsk.mt.saveCalls
        );
    },

    /**
     * Save the most recent calls for the current account into com.gsk.mt.calls
     * @param {Object} result
     */
    saveCalls: function(result) {
        if (result.success) {
            com.gsk.mt.calls = result.Call2_vod__c;
            com.gsk.mt.queryClickstreams();
        }
    },

    /**
     * Find clickstreams for a specific call and presentation.
     */
    queryClickstreams: function() {
        if (com.gsk.mt.calls.length > 0) {
            var call = com.gsk.mt.calls.shift();

            com.veeva.clm.queryRecord(
                "Call_Clickstream_vod__c",
                "Name,Call_vod__c,Presentation_ID_vod__c,Question_vod__c,Answer_vod__c,Track_Element_Id_vod__c,Track_Element_Description_vod__c",
                "WHERE Presentation_ID_vod__c='" + com.gsk.mt.presentationId + "' AND Call_vod__c='" + call.Id + "'",
                [ "Name, DESC" ],
                100,
                com.gsk.mt.getClickstreamsForCalls
            );
        }
    },

    /**
     * Check whether the call has clickstreams
     * @param {Object} result
     */
    getClickstreamsForCalls: function(result) {
        if (result.success && result.Call_Clickstream_vod__c.length > 0) {
            com.gsk.mt.beginFeedbackQueue(result);
        } else {
            com.gsk.mt.queryClickstreams();
        }
    },

    /**
     * Iterate through clickstreams
     * @param {Object} result
     */
    beginFeedbackQueue: function(result) {
        for (var ii = 0; ii < com.gsk.mt.cstreamStack.length; ii++) {
            com.gsk.mt.setFeedbackElement(com.gsk.mt.cstreamStack[ii], result);
        }
    },

    /**
     * Check whether clickstream value applies to an element on the current slide
     * @param {Object} $element
     * @param {Object} result
     */
    setFeedbackElement: function($element, result) {
        var clickStream = null,
            elementId = $element.attr("id");

        for (var ii = 0; ii < result.Call_Clickstream_vod__c.length; ii++) {
            if (result.Call_Clickstream_vod__c[ii].Track_Element_Id_vod__c === elementId) {
                com.gsk.mt.setFeedbackElementValue($element, result.Call_Clickstream_vod__c[ii].Answer_vod__c);
                return;
            }
        }
    },

    /**
     * Set the specified element's value to the clickstream value
     * @param {Object} $element
     * @param {string} value
     */
    setFeedbackElementValue: function($element, value) {
        if ($element.is("[type=checkbox]") || $element.is("[type=radio]")) {
            if (value === "true") {
                $element.prop("checked", true);
            } else {
                $element.prop("checked", false);
            }
        } else if ($element.hasClass("slider")) {
            $element.slider("value", parseInt(value));
        } else {
            $element.val(value);
        }
        window.sessionStorage.setItem("mtgskFeedback" + $element.attr("id"), value);
    },

    /**
     * Gets data from the specified field and inserts the result into the
     * specified container
     * @param {string} object
     * @param {string} field
     * @param {string} fallback Fallback text to insert on desktop or failure
     * @param {string} container
     * @param {callback} [callback] Optional callback passed to getDataForCurrentObject
     *                              This will overwrite the current functionality
     */
    readField: function(object, field, fallback, container, callback) {
        var $container = $(container);
        callback = callback || function(result) {
                if (result[object] !== undefined &&
                    result[object][field] !== undefined)
                {
                    $container.html(result[object][field]);
                } else {
                    $container.html(fallback);
                }
            };
        if (com.gsk.mt.isVeeva) {
            com.veeva.clm.getDataForCurrentObject(object, field, callback);
        } else {
            $container.html(fallback);
        }
    },

    /**
     * Writes data to Account.ID
     * @param {string} object
     * @param {Object} clickStream
     * @param {callback} [callback] Optional callback passed to getDataForCurrentObject
     */
    writeToAccountId: function(object, clickStream, callback) {
        callback = callback || function() { return 0; };
        com.gsk.mt.debug(object + ".ID - " + JSON.stringify(clickStream));
        if (com.gsk.mt.isVeeva) {
            com.veeva.clm.getDataForCurrentObject(object, "ID", function(result) {
                com.veeva.clm.updateRecord(object, result[object]["ID"], clickStream, callback);
            });
        }
    },

    /**
     * If in the Veeva environment, write to the backend
     * @param {string} object
     * @param {Object} clickStream
     * @param {callback} [callback]
     */
    createRecord: function(object, clickStream, callback) {
        if (com.gsk.mt.isVeeva) {
            com.veeva.clm.createRecord(object, clickStream, callback);
        }
    },

    /**
     * Track a quick link dialog
     * @param {Object} $element
     */
    trackQuickLink: function($element) {
        var slideIndex = com.gsk.mtconfig.pagesAll.indexOf(com.gsk.mt.currentSlide),
            clickStreamArray = [
                {
                    Track_Element_Id_vod__c: com.gsk.mtconfig.pagesTitles[slideIndex],
                    Track_Element_Type_vod__c: "Popup",
                    Track_Element_Description_vod__c: $element.attr("data-description")
                }
            ];

        if (clickStreamArray[clickStreamArray.length - 1].Track_Element_Id_vod__c === undefined) {
            slideIndex = com.gsk.mtconfig.addAll.indexOf(com.gsk.mt.currentSlide);
            if (slideIndex > -1) {
                clickStreamArray[clickStreamArray.length - 1].Track_Element_Id_vod__c = com.gsk.mtconfig.addTitles[slideIndex];
            } else {
                com.gsk.mt.log("Warning: Slide " + com.gsk.mt.currentSlide + " has no title. Ensure values are set in presentation.js");
            }
        }
        com.gsk.mt.clickStreamSubmit(clickStreamArray);

        $element.addClass("trackingSubmitted");
        if ($element.hasClass("gotoRef")) {
            $(".gotoRef").addClass("trackingSubmitted");
        }
    },

    /**
     * Write clickstream values
     * @param {Object} $element
     * @param {string} answer
     * @param {callback} [callback] Optional callback passed to createRecord
     */
    trackField: function($element, answer, callback) {
        if ($element.attr("data-onetime") === "1") {
            $element[0].disabled = true;
            $element.attr("data-clicked", 1);
            window.sessionStorage.setItem($element.attr('id'), true);
        }
        callback = callback || function() { return 0; };
        var clickStream = com.gsk.mt.buildClickStream($element, answer);

        com.gsk.mt.debug(JSON.stringify(clickStream));
        com.gsk.mt.createRecord("Call_Clickstream_vod__c", clickStream, callback);
    },

    /**
     * Submit an individual form field
     */
    formSubmitAccount: function() {
        $.each($(".logAccountField"), function() {
            var $this = $(this),
                type = $this.attr('type'),
                object = $this.attr("data-object"),
                answer,
                clickStream;

            if ($this.hasClass('slider')) {
                answer = $this.slider("value");
            } else {
                answer = $this.val();
                if (type === 'text') {
                    $this.val("");
                }
            }

            clickStream = com.gsk.mt.buildClickStream($this, answer);
            if (clickStream !== null) {
                com.gsk.mt.writeToAccountId(object, clickStream);
            }
        });
    },

    /**
     * Restore form field to stored value
     * @param {Object} $element
     */
    restoreField: function($element){
        var type = $element.attr('type'),
            value = window.sessionStorage.getItem($element.attr('id'));

        if (type === 'checkbox' && value === 'checked') {
            $element.prop('checked', true);console.log($element)
        } else if (type === 'radio' && value === 'true') {
            $element.prop('checked', true);
        } else if (type === 'text') {
            $element.val(value);
        } else if ($element.hasClass('slider')) {
            $element.slider("value", value);
        } else if ($element.prop("tagName").toLowerCase() === "select") {
            $element[0].selectedIndex = value;
        }
    },

    /**
     * Restore form to stored state
     */
    retrieveFields: function() {
        $.each($('.logFormField'), function() {
            com.gsk.mt.restoreField($(this));
        });
    },

    /**
     * Store a form field's value
     * @param {string} type
     * @param {Object} $element
     */
    storeField: function(type, $element) {
        if (type === 'checkbox' && $element.prop('checked')) {
            window.sessionStorage.setItem($element.attr('id'), 'checked');
        } else if (type === 'radio') {
            window.sessionStorage.setItem($element.attr('id'),
                $element.is(":checked"));
        } else if (type === 'text') {
            window.sessionStorage.setItem($element.attr('id'),
                $element.val());
        } else if ($element.hasClass('slider')) {
            window.sessionStorage.setItem($element.attr('id'),
                $element.slider("value"));
        } else if (String($element.prop("tagName")).toLowerCase() === "select") {
            window.sessionStorage.setItem($element.attr('id'),
                $element[0].selectedIndex);
        }
    },

    /**
     * Builds a clickstream object for getElementData
     * @param {Object} $element
     * @param {string} answer
     * @returns {Object} Clickstream object
     */
    buildClickStream: function($element, answer) {
        var clickStream = {},
            fields = ($element.attr("data-fields")).split("|"),
            values = ($element.attr("data-description")).split("|"),
            startTime = com.gsk.mt.lastStartTime;

        com.gsk.mt.lastStartTime = null;

        if (fields.length === 0) {
            com.gsk.mt.debug("Error: No fields specified.");
            return null;
        } else if (fields.length !== values.length) {
            com.gsk.mt.debug("Error: Number of fields not equal to descriptions.");
            return null;
        }

        for (var ii = 0; ii < fields.length; ii++) {
            // Convert friendly field name to api field if necessary
            var field = fields[ii];
            if (field.indexOf("_vod__c") === -1) {
                field = com.gsk.mt.apiFields[field];
            }

            if (field !== undefined) {
                if (values[ii] === "[data]") {
                    clickStream[field] = answer;
                } else if (values[ii] === "[start]") {
                    if (startTime !== null) {
                        clickStream[field] = startTime;
                    } else {
                        clickStream[field] = new Date();
                    }
                } else {
                    clickStream[field] = values[ii];
                }
            } else {
                com.gsk.mt.debug("Error: field ["+fields[ii]+"] not found!");
            }
        }
        return clickStream;
    },

    /**
     * Get value of an element and store in a clickStream object
     * @param {string} type
     * @param {Object} $element
     * @returns {Object} Clickstream object
     */
    getElementData: function(type, $element) {
        if (type === 'checkbox' && $element.prop('checked')) {
            return com.gsk.mt.buildClickStream($element, "");
        } else if (type === 'text' || String($element.prop("tagName")).toLowerCase() === "select" || (type === 'radio' && $element.prop("checked"))) {
            return com.gsk.mt.buildClickStream($element, $element.val());
        } else if ($element.hasClass('slider')) {
            return com.gsk.mt.buildClickStream($element, ""+$element.slider("value"));
        }
    },

    /**
     * Store the values of a form
     * @param {Object} $element Form button
     */
    formSubmit: function($element) {
        var clickStreamContainer = [],
            loopCounter = 0,
            onCompleteCallback = $element.attr("data-callback-name") || "none";

        $element[0].disabled = true;
        $element.attr("data-clicked", 1);

        $.each($('.logFormField'), function() {
            var $this = $(this),
                type = $this.attr('type');
            com.gsk.mt.storeField(type, $this);
            var clickStream = com.gsk.mt.getElementData(type, $this);
            if (clickStream !== null && !$.isEmptyObject(clickStream)) {
                clickStreamContainer.push(clickStream);
            }
        });
        if (clickStreamContainer.length) {
            var index = 0;
            if (com.gsk.mt.isVeeva) {
                var callback = function() {
                    if (clickStreamContainer.length > index && loopCounter < com.gsk.mt.maxIterations) {
                        index++;
                        com.gsk.mt.createRecord("Call_Clickstream_vod__c", clickStreamContainer[index], callback);
                    } else {
                        if ($element.attr("data-onetime") !== "1") {
                            $element[0].disabled = false;
                            $element.attr("data-clicked", 0);
                        } else {
                            window.sessionStorage.setItem($element.attr('id'), true);
                        }

                        // Check for and invoke custom callback once clickstreams have been written
                        if (com.gsk.mt[onCompleteCallback] !== undefined &&
                            Object.prototype.toString.call(com.gsk.mt[onCompleteCallback]) === '[object Function]')
                        {
                            com.gsk.mt[onCompleteCallback]();
                        }
                    }
                };
                com.gsk.mt.createRecord("Call_Clickstream_vod__c", clickStreamContainer[0], callback);
            } else {
                while (clickStreamContainer.length > index && loopCounter < com.gsk.mt.maxIterations) {
                    com.gsk.mt.debug(JSON.stringify(clickStreamContainer[index]));
                    index++;
                    loopCounter++;
                }
                if ($element.attr("data-onetime") !== "1") {
                    $element[0].disabled = false;
                    $element.attr("data-clicked", 0);
                } else {
                    window.sessionStorage.setItem($element.attr('id'), true);
                }

                // Check for and invoke custom callback once clickstreams have been written
                if (com.gsk.mt[onCompleteCallback] !== undefined &&
                    Object.prototype.toString.call(com.gsk.mt[onCompleteCallback]) === '[object Function]')
                {
                    com.gsk.mt[onCompleteCallback]();
                }
            }
        }
    },

    /**
     * Store the values of a form
     * @param {Array} clickStreamContainer Array of clickstream data
     * @param {callback} [onCompleteCallback] Optional callback to be invoked on completion
     */
    clickStreamSubmit: function(clickStreamContainer, onCompleteCallback) {
        var loopCounter = 0;
        com.gsk.mt.clickStreamSubmitCallback = onCompleteCallback;

        if (clickStreamContainer.length) {
            var index = 0;
            if (com.gsk.mt.isVeeva) {
                var callback = function() {
                    if (clickStreamContainer.length > index && loopCounter < com.gsk.mt.maxIterations) {
                        index++;
                        com.gsk.mt.createRecord("Call_Clickstream_vod__c", clickStreamContainer[index], callback);
                    } else {
                        // Check for and invoke custom callback once clickstreams have been written
                        if (com.gsk.mt.clickStreamSubmitCallback !== undefined &&
                            Object.prototype.toString.call(com.gsk.mt.clickStreamSubmitCallback) === '[object Function]')
                        {
                            com.gsk.mt.clickStreamSubmitCallback();
                        }
                    }
                };
                com.gsk.mt.createRecord("Call_Clickstream_vod__c", clickStreamContainer[0], callback);
            } else {
                while (clickStreamContainer.length > index && loopCounter < com.gsk.mt.maxIterations) {
                    com.gsk.mt.debug(JSON.stringify(clickStreamContainer[index]));
                    index++;
                    loopCounter++;
                }

                // Check for and invoke custom callback once clickstreams have been written
                if (com.gsk.mt.clickStreamSubmitCallback !== undefined &&
                    Object.prototype.toString.call(com.gsk.mt.clickStreamSubmitCallback) === '[object Function]')
                {
                    com.gsk.mt.clickStreamSubmitCallback();
                }
            }
        }
    },

    /* Email */

    /**
     * Select or deselect a fragment
     * @param {Object} $element
     */
    toggleFragment: function($element) {
        var fragment = parseInt($element.attr("data-fragment")),
            fragmentSelectedLength = $(".gskFragmentSelected").length;

        if ($element.hasClass("gskFragmentSelected")) {
            com.gsk.mt.removeFragment(fragment);
            $element.removeClass("gskFragmentSelected");
            fragmentSelectedLength--;
            if (fragmentSelectedLength < 1) {
                com.gsk.mt.dom.email.removeClass("active");
            }
        } else {
            com.gsk.mt.addFragment(fragment);
            $element.addClass("gskFragmentSelected");
            com.gsk.mt.dom.email.addClass("active");
            fragmentSelectedLength++;
        }

        // Selector count - the number on the email button showing the
        // number of fragments, applicable to that slide, that have been
        // selected
        var $selectorCount = $('.selectorCount');

        if (fragmentSelectedLength > 0) {
            $selectorCount.removeClass("hidden").html(fragmentSelectedLength);
        } else {
            $selectorCount.addClass("hidden");
        }
    },

    /**
     * Launch Approved Email
     * @param $element
     */
    sendEmail: function($element) {
        if ($element.attr("data-sent") === "1") {
            // Do nothing
        } else {
            com.gsk.mt.launchEmail();
            // Stop unintended multiple clicks/taps from triggering send
            $element.attr("data-sent", 1);
            // Timeout clears the send blocker
            setTimeout(function() {
                com.gsk.mt.dom.email.attr("data-sent", 0);
            }, 5000);
        }
    },

    /**
     * Retrieve email fragment IDs from session storage and store them in
     * com.gsk.mt.emailFragments
     */
    getSavedFragments: function() {
        var fragments = window.sessionStorage.getItem('mtgskEmailFragments');
        com.gsk.mt.emailFragments = JSON.parse(fragments);
        if (!com.gsk.mt.emailFragments) {
            com.gsk.mt.emailFragments = [];
        }
        com.gsk.mt.emailFragments.sort();
    },

    /**
     * Add a fragment to the email fragments list if it does not exist
     * @param {number} fragmentId
     */
    addFragment: function(fragmentId) {
        if (com.gsk.mt.emailFragments.indexOf(fragmentId) === -1) {
            com.gsk.mt.emailFragments.push(fragmentId);
            com.gsk.mt.emailFragments.sort();
            var fragments = JSON.stringify(com.gsk.mt.emailFragments);
            window.sessionStorage.setItem('mtgskEmailFragments', fragments);
        }
        com.gsk.mt.debug("Email fragments: " + com.gsk.mt.emailFragments +
            " stored");
    },

    /**
     * Remove a fragment from the email fragments list if it exists
     * @param {number} fragmentId
     */
    removeFragment: function(fragmentId) {
        var fragmentIndex = com.gsk.mt.emailFragments.indexOf(fragmentId);
        if (fragmentIndex !== -1) {
            com.gsk.mt.emailFragments.splice(fragmentIndex, 1);
            com.gsk.mt.emailFragments.sort();
            var fragments = JSON.stringify(com.gsk.mt.emailFragments);
            window.sessionStorage.setItem('mtgskEmailFragments', fragments);
        }
        com.gsk.mt.debug("Email fragments: " + com.gsk.mt.emailFragments +
            " removed");
    },

    /**
     * Pass along the stored fragments and launch approved email
     */
    launchEmail: function(){
        com.gsk.mt.debug("Send email template with fragments: " + com.gsk.mt.emailFragments);
        if (com.gsk.mt.isVeeva) {
            var loopIndex = -1,
                emailTemplateId = -1,
                emailFragmentTemplateIds = [];

            var callback = function(result) {
                loopIndex++;
                if (result.success) {
                    if (loopIndex === 0) {
                        // First loop
                        emailTemplateId = result.Approved_Document_vod__c.ID;
                        if (com.gsk.mt.emailFragments.length === 0) {
                            // No email fragments
                            com.veeva.clm.launchApprovedEmail(emailTemplateId, emailFragmentTemplateIds, function() { return 0; });
                        } else {
                            com.veeva.clm.getApprovedDocument(com.gsk.mtconfig.vaultID, com.gsk.mt.emailFragments[loopIndex], callback);
                        }
                    } else if (loopIndex === com.gsk.mt.emailFragments.length) {
                        // Final loop
                        emailFragmentTemplateIds.push(result.Approved_Document_vod__c.ID);
                        com.veeva.clm.launchApprovedEmail(emailTemplateId, emailFragmentTemplateIds, function() { return 0; });
                    } else {
                        emailFragmentTemplateIds.push(result.Approved_Document_vod__c.ID);
                        com.veeva.clm.getApprovedDocument(com.gsk.mtconfig.vaultID, com.gsk.mt.emailFragments[loopIndex], callback);
                    }
                }
            };
            com.veeva.clm.getApprovedDocument(com.gsk.mtconfig.vaultID, com.gsk.mtconfig.templateID, callback);
        }
    },

    /**
     * Insert the fragment selector markup including fragments for this slide
     * Only called if not using a custom fragment selector
     */
    insertFragmentSelector: function() {
        var selectorHTML = '<div id="fragmentSelector" class="hidden"><div id="fragmentSelectorInner">',
            pageEmail = com.gsk.mtconfig.pagesEmail[com.gsk.mt.currentSlide],
            insertedFragments = [];

        for (var ii = 0; ii < pageEmail.length; ii++) {
            var fragment = com.gsk.mtconfig.fragments[pageEmail[ii]];
            if (insertedFragments.indexOf(fragment.id) === -1) {
                insertedFragments.push(fragment.id);
                var fragmentIndex = com.gsk.mt.emailFragments.indexOf(fragment.id),
                    selClass = "";
                if (fragmentIndex !== -1) {
                    selClass = "gskFragmentSelected ";
                    com.gsk.mt.dom.email.addClass("active");
                }
                selectorHTML += '<div class="' + selClass + 'fragmentOption" data-fragment="' + fragment.id + '">' + fragment.label + '</div>';
            }
        }
        selectorHTML += '<div id="closeSelector"></div></div>' + '<div class="selectorTriangle"></div></div>';
        com.gsk.mt.dom.container.append(selectorHTML);
    },

    /**
     * Populate the fragment selector for this slide. Only called if using a
     * custom fragment selector
     */
    populateFragmentSelector: function() {
        var $container = $(com.gsk.mtconfig.customFragmentSelectorContainer),
            $parent = $container.parent(),
            pageEmail = com.gsk.mtconfig.pagesEmail[com.gsk.mt.currentSlide],
            insertedFragments = [];

        if ($container.length) {
            $container.detach();
            var selectorHTML = "";
            for (var ii = 0; ii < pageEmail.length; ii++) {
                var fragment = com.gsk.mtconfig.fragments[pageEmail[ii]];
                if (insertedFragments.indexOf(fragment.id) === -1) {
                    insertedFragments.push(fragment.id);
                    var fragmentIndex = com.gsk.mt.emailFragments.indexOf(fragment.id);
                    var selClass = "";
                    if (fragmentIndex !== -1) {
                        selClass = "gskFragmentSelected ";
                        com.gsk.mt.dom.email.addClass("active");
                    }
                    selectorHTML += '<div class="' + selClass + 'fragmentOption" data-fragment="' + fragment.id + '">' + fragment.label + '</div>';
                }
            }

            $container.append(selectorHTML);
            $parent.append($container);
        }
    },

    /**
     * Count the number of selected fragments on this slide and populate the
     * fragment count
     */
    fragmentCount: function() {
        com.gsk.mt.dom.email.html('<div class="selectorCount"></div>');

        var length = $(".gskFragmentSelected").length,
            $selectorCount = $(".selectorCount");

        $selectorCount.html(length);
        if (length > 0) {
            $selectorCount.removeClass("hidden");
        } else {
            $selectorCount.addClass("hidden");
        }
    },

    /**
     * Count the number of selected fragments on all slides and populate the
     * fragment count
     */
    fragmentCountFinal: function() {
        com.gsk.mt.dom.email.html('<div class="selectorCount">'+com.gsk.mt.emailFragments.length+'</div>');
    },

    /* Tracking */

    /**
     * Creates a tracked jQuery UI slider
     * @param {Object} $slider
     */
    initTrackedSlider: function($slider) {
        $slider.slider({
            min: parseInt($slider.attr("data-min")),
            max: parseInt($slider.attr("data-max")),
            step: parseInt($slider.attr("data-step")),
            value: parseInt($slider.attr("data-value")),
            start: function() {
                com.gsk.mt.blockLinks = true;
            },
            change: function(e, ui) {
                if ($slider.hasClass("logField")) {
                    var $this = $(this);

                    com.gsk.mt.trackField($this, ui.value);
                }
            },
            stop: function() {
                setTimeout(function() {
                    com.gsk.mt.blockLinks = false;
                }, 250);
            }
        });
    },

    /**
     * Store a video event (time on pause or video ended)
     * @param {Object} player Video player element
     */
    trackVideoEvent: function(player) {
        var time = com.gsk.mt.getSeconds(player),
            clickStream = com.gsk.mt.buildClickStream($("#"+player.id()), time);

        if (clickStream === null) { return 0; }

        var jsonString = JSON.stringify(clickStream);
        com.gsk.mt.debug(jsonString);

        var callback = function() { return 0; };
        com.gsk.mt.createRecord("Call_Clickstream_vod__c", clickStream, callback);
    },

    /**
     *
     * @param {Object} video
     * @returns {number}
     */
    getSeconds: function(video){
        var seconds = 0;
        video = $("#"+video.id()).find("video").get(0);
        if (video.played.length > 1) {
            for(var ii = 1; ii < video.played.length; ii++) {
                seconds += video.played.end(ii) - video.played.start(ii);
            }
        } else if (video.played.length > 0) {
            seconds += video.played.end(0) - video.played.start(0);
        }
        return Math.round(seconds);
    },

    /**
     * Initialise a dialog
     * @param {Object} $dialog
     */
    initDialog: function($dialog) {
        var options = {};

        if (com.gsk.mt.dialogOptions !== undefined) {
            options = com.gsk.mt.dialogOptions;
        } else {
            var show = $dialog.attr("data-show"),
                hide = $dialog.attr("data-hide");
            options = {
                autoOpen: false,
                buttons: $dialog.attr("data-buttons") || [],
                draggable: false,
                modal: true,
                resizable: false
            };

            if (show !== undefined) {
                if (show.indexOf("{") > -1) {
                    show = JSON.parse(show);
                }
                options.show = show;
            }
            if (hide !== undefined) {
                if (hide.indexOf("{") > -1) {
                    hide = JSON.parse(hide);
                }
                options.hide = hide;
            }
        }

        $dialog.dialog(options);
        $dialog.data("gskmtIScroll", null);

        $dialog.removeClass("hidden");
        if ($dialog.hasClass("noTitlebar")) {
            $dialog.siblings(".ui-dialog-titlebar").addClass("ui-titlebar-hidden");
        }

        if ($dialog.attr("data-dialog-class") !== undefined) {
            $dialog.parent(".ui-dialog").addClass($dialog.attr("data-dialog-class"));
        }

        if ($dialog.attr("data-width")) {
            if ($dialog.attr("data-width") > com.gsk.mtconfig.dialogMaxWidth) {
                $dialog.attr("data-width", com.gsk.mtconfig.dialogMaxWidth);
            }
            $dialog.dialog("option", "width", $dialog.attr("data-width"));
            $dialog.dialog("option", "maxWidth", $dialog.attr("data-width"));
        }
        if ($dialog.attr("data-height")) {
            if ($dialog.attr("data-height") > com.gsk.mtconfig.dialogMaxHeight) {
                $dialog.attr("data-height", com.gsk.mtconfig.dialogMaxHeight);
            }
            $dialog.dialog("option", "height", $dialog.attr("data-height"));
            $dialog.dialog("option", "maxHeight", $dialog.attr("data-height"));
        }
    },

    /**
     * Open a dialog
     * @param {Object} $dialog The dialog being opened
     */
    openDialog: function($dialog) {
        $dialog.dialog("open");
        com.gsk.mt.dialogStack.push($dialog);
        if (com.gsk.mt.onDialogOpen !== undefined) {
            com.gsk.mt.onDialogOpen();
        }

        com.gsk.mt.rebuildDialogIscroll($dialog);

        if (com.gsk.mtconfig.enableQuickLinksOnDialog) {
            $(".navBottom").appendTo($(".ui-widget-overlay").last());
        }
    },

    /**
     * Rebuild iScroll for the current dialog
     * @param {Object} $dialog
     */
    rebuildDialogIscroll: function($dialog) {
        com.gsk.mt.destroyDialogIscroll($dialog);
        com.gsk.mt.createDialogIscroll($dialog);
    },

    /**
     * Destroy the iScroll container for a dialog
     * @param {Object} $dialog
     */
    destroyDialogIscroll: function($dialog) {
        var currentDialogData = $dialog.data("gskmtIScroll");
        if (currentDialogData !== null && currentDialogData !== undefined) {
            currentDialogData.scrollTo(0, 0);
            currentDialogData.destroy();
            $dialog.data("gskmtIScroll", null);
        }
    },

    /**
     * Create the iScroll container for a dialog
     * @param {Object} $dialog
     */
    createDialogIscroll: function($dialog) {
        var currentDialogBody = $dialog.find(".dialogBody");
        if (currentDialogBody.outerHeight() > $dialog.innerHeight()) {
            var currentDialogData = $dialog.data("gskmtIScroll");
            if (currentDialogData === null) {
                $dialog.addClass("dialog-iscroll").css({
                    "width": $dialog.innerWidth(),
                    "height": $dialog.innerHeight()
                });
                com.gsk.mt.initScroller($dialog);
            }
        }
    },

    /**
     * Get the topmost dialog
     * @returns {Object}
     */
    getActiveDialog: function() {
        if (com.gsk.mt.dialogStack.length > 0) {
            return com.gsk.mt.dialogStack[com.gsk.mt.dialogStack.length - 1];
        }
        return null;
    },

    /**
     * Clean up slide
     * Required to prevent issue with scrollable areas and pdf links
     */
    cleanUp: function() {
        $("body").html("");
        $('link[rel=stylesheet]').remove();
    }

};

/**
 * Custom dialogs - created for custom menu popup
 * @param triggerId - without #
 */
com.gsk.mt.custom.dialog = function(triggerId) {
    var $element,
        $trigger;

    return this.initialise(triggerId);
};

com.gsk.mt.custom.dialog.prototype.initialise = function(triggerId) {
    var elementId;

    this.$trigger = $(triggerId);
    elementId = this.$trigger.attr('data-show');
    if (elementId !== undefined) {
        this.generateElement(elementId.replace('#', ''));
        return this.$element;
    } else {
        com.gsk.mt.log("Error: Custom dialog trigger does not have a data-show attribute!");
        return null;
    }
};

com.gsk.mt.custom.dialog.prototype.generateElement = function(elementId) {
    $('<div id="' + elementId + '" class="customDialog hidden"></div>').appendTo(com.gsk.mt.dom.container);
    this.$element = $('#' + elementId);

    this.$element.append('<div class="closeCustom" data-hide="#' + elementId + '"></div>');
    this.$element.append('<div class="customDialogBody"></div>');
};

com.veeva.clm.createRecordsOnExit = function() {
    com.gsk.mt.callObjectArray = [];
    var clickStreamArray = [];

    // Video tracking
    if (com.gsk.mt.currentVideo !== null) {
        var $player = $("#"+com.gsk.mt.currentVideo.id()),
            time = com.gsk.mt.getSeconds(com.gsk.mt.currentVideo),
            clickStreamVideo = com.gsk.mt.buildClickStream($player, time);

        com.gsk.mt.callObjectArray.push("Call_Clickstream_vod__c");

        if (clickStreamVideo !== null) {
            clickStreamArray.push(clickStreamVideo);
        }
    }

    // Link tracking
    if (com.gsk.mt.trackedLink !== null) {
        var clickStreamLink = com.gsk.mt.buildClickStream(com.gsk.mt.trackedLink, "");

        com.gsk.mt.callObjectArray.push("Call_Clickstream_vod__c");

        if (clickStreamLink !== null) {
            clickStreamArray.push(clickStreamLink);
        }
    }

    // Feedback tracking
    if (com.gsk.mt.sendFeedback) {
        var $dynamicFeedback = $(".dynamicFeedback");
        $.each($dynamicFeedback, function() {
            var $element = $(this),
                question = $element.attr("data-description"),
                answer,
                clickStream;

            if ($element.is("[type=checkbox]") || $element.is("[type=radio]")) {
                if ($element.prop("checked")) {
                    answer = "true"
                } else {
                    answer = "false"
                }
            } else if ($element.hasClass("slider")) {
                answer = $element.slider("value").toString();
            } else {
                answer = $element.val();
            }

            window.sessionStorage.setItem("mtgskFeedback" + $element.attr("id"), answer);

            clickStream = {
                Track_Element_Id_vod__c: $element.attr("id"),
                Track_Element_Description_vod__c: "Feedback",
                Question_vod__c: question,
                Answer_vod__c: answer
            };

            if (answer.length > 0) {
                com.gsk.mt.callObjectArray.push("Call_Clickstream_vod__c");
                clickStreamArray.push(clickStream);
            }
        });
    }

    // Additional tracking
    if (com.gsk.mt.onSlideExit !== undefined) {
        clickStreamArray = com.gsk.mt.onSlideExit(clickStreamArray);
    }

    // Clean up slide - required due to issue with pdf slides becoming unscrollable.
    com.gsk.mt.cleanUp();

    if (clickStreamArray.length > 0) {
        if (com.gsk.mt.isVeeva) {
            return com.veeva.clm.formatCreateRecords(com.gsk.mt.callObjectArray, clickStreamArray);
        } else {
            com.gsk.mt.debug(JSON.stringify(clickStreamArray));
        }
    }
};

/**
 * jquery.hammer.js 2.0.0
 * https://github.com/hammerjs/jquery.hammer.js
 */
(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));

(function($) {
  var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
  $.fn.nodoubletapzoom = function() {
    if (IS_IOS)
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap

        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };
})(jQuery);

/* Detect-zoom
 * -----------
 * Cross Browser Zoom and Pixel Ratio Detector
 * Version 1.0.4 | Apr 1 2013
 * dual-licensed under the WTFPL and MIT license
 * Maintained by https://github/tombigel
 * Original developer https://github.com/yonran
 */

//AMD and CommonJS initialization copied from https://github.com/zohararad/audio5js
(function (root, ns, factory) {
    "use strict";

    if (typeof (module) !== 'undefined' && module.exports) { // CommonJS
        module.exports = factory(ns, root);
    } else if (typeof (define) === 'function' && define.amd) { // AMD
        define("detect-zoom", function () {
            return factory(ns, root);
        });
    } else {
        root[ns] = factory(ns, root);
    }

}(window, 'detectZoom', function () {

    /**
     * Use devicePixelRatio if supported by the browser
     * @return {Number}
     * @private
     */
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };

    /**
     * Fallback function to set default values
     * @return {Object}
     * @private
     */
    var fallback = function () {
        return {
            zoom: 1,
            devicePxPerCssPx: 1
        };
    };
    /**
     * IE 8 and 9: no trick needed!
     * TODO: Test on IE10 and Windows 8 RT
     * @return {Object}
     * @private
     **/
    var ie8 = function () {
        var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For IE10 we need to change our technique again...
     * thanks https://github.com/stefanvanburen
     * @return {Object}
     * @private
     */
    var ie10 = function () {
        var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * For chrome
     *
     */
    var chrome = function()
    {
        var zoom = Math.round(((window.outerWidth) / window.innerWidth)*100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    }

    /**
     * For safari (same as chrome)
     *
     */
    var safari= function()
    {
        var zoom = Math.round(((document.documentElement.clientWidth) / window.innerWidth)*100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    }


    /**
     * Mobile WebKit
     * the trick: window.innerWIdth is in CSS pixels, while
     * screen.width and screen.height are in system pixels.
     * And there are no scrollbars to mess up the measurement.
     * @return {Object}
     * @private
     */
    var webkitMobile = function () {
        var deviceWidth = (Math.abs(window.orientation) == 90) ? screen.height : screen.width;
        var zoom = deviceWidth / window.innerWidth;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Desktop Webkit
     * the trick: an element's clientHeight is in CSS pixels, while you can
     * set its line-height in system pixels using font-size and
     * -webkit-text-size-adjust:none.
     * device-pixel-ratio: http://www.webkit.org/blog/55/high-dpi-web-sites/
     *
     * Previous trick (used before http://trac.webkit.org/changeset/100847):
     * documentElement.scrollWidth is in CSS pixels, while
     * document.width was in system pixels. Note that this is the
     * layout width of the document, which is slightly different from viewport
     * because document width does not include scrollbars and might be wider
     * due to big elements.
     * @return {Object}
     * @private
     */
    var webkit = function () {
        var important = function (str) {
            return str.replace(/;/g, " !important;");
        };

        var div = document.createElement('div');
        div.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";
        div.setAttribute('style', important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));

        // The container exists so that the div will be laid out in its own flow
        // while not impacting the layout, viewport size, or display of the
        // webpage as a whole.
        // Add !important and relevant CSS rule resets
        // so that other rules cannot affect the results.
        var container = document.createElement('div');
        container.setAttribute('style', important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));
        container.appendChild(div);

        document.body.appendChild(container);
        var zoom = 1000 / div.clientHeight;
        zoom = Math.round(zoom * 100) / 100;
        document.body.removeChild(container);

        return{
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * no real trick; device-pixel-ratio is the ratio of device dpi / css dpi.
     * (Note that this is a different interpretation than Webkit's device
     * pixel ratio, which is the ratio device dpi / system dpi).
     *
     * Also, for Mozilla, there is no difference between the zoom factor and the device ratio.
     *
     * @return {Object}
     * @private
     */
    var firefox4 = function () {
        var zoom = mediaQueryBinarySearch('min--moz-device-pixel-ratio', '', 0, 10, 20, 0.0001);
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom
        };
    };

    /**
     * Firefox 18.x
     * Mozilla added support for devicePixelRatio to Firefox 18,
     * but it is affected by the zoom level, so, like in older
     * Firefox we can't tell if we are in zoom mode or in a device
     * with a different pixel ratio
     * @return {Object}
     * @private
     */
    var firefox18 = function () {
        return {
            zoom: firefox4().zoom,
            devicePxPerCssPx: devicePixelRatio()
        };
    };

    /**
     * works starting Opera 11.11
     * the trick: outerWidth is the viewport width including scrollbars in
     * system px, while innerWidth is the viewport width including scrollbars
     * in CSS px
     * @return {Object}
     * @private
     */
    var opera11 = function () {
        var zoom = window.top.outerWidth / window.top.innerWidth;
        zoom = Math.round(zoom * 100) / 100;
        return {
            zoom: zoom,
            devicePxPerCssPx: zoom * devicePixelRatio()
        };
    };

    /**
     * Use a binary search through media queries to find zoom level in Firefox
     * @param property
     * @param unit
     * @param a
     * @param b
     * @param maxIter
     * @param epsilon
     * @return {Number}
     */
    var mediaQueryBinarySearch = function (property, unit, a, b, maxIter, epsilon) {
        var matchMedia;
        var head, style, div;
        if (window.matchMedia) {
            matchMedia = window.matchMedia;
        } else {
            head = document.getElementsByTagName('head')[0];
            style = document.createElement('style');
            head.appendChild(style);

            div = document.createElement('div');
            div.className = 'mediaQueryBinarySearch';
            div.style.display = 'none';
            document.body.appendChild(div);

            matchMedia = function (query) {
                style.sheet.insertRule('@media ' + query + '{.mediaQueryBinarySearch ' + '{text-decoration: underline} }', 0);
                var matched = getComputedStyle(div, null).textDecoration == 'underline';
                style.sheet.deleteRule(0);
                return {matches: matched};
            };
        }
        var ratio = binarySearch(a, b, maxIter);
        if (div) {
            head.removeChild(style);
            document.body.removeChild(div);
        }
        return ratio;

        function binarySearch(a, b, maxIter) {
            var mid = (a + b) / 2;
            if (maxIter <= 0 || b - a < epsilon) {
                return mid;
            }
            var query = "(" + property + ":" + mid + unit + ")";
            if (matchMedia(query).matches) {
                return binarySearch(mid, b, maxIter - 1);
            } else {
                return binarySearch(a, mid, maxIter - 1);
            }
        }
    };

    /**
     * Generate detection function
     * @private
     */
    var detectFunction = (function () {
        var func = fallback;
        //IE8+
        if (!isNaN(screen.logicalXDPI) && !isNaN(screen.systemXDPI)) {
            func = ie8;
        }
        // IE10+ / Touch
        else if (window.navigator.msMaxTouchPoints) {
            func = ie10;
        }
        //chrome
        else if(!!window.chrome && !(!!window.opera || navigator.userAgent.indexOf(' Opera') >= 0)){
            func = chrome;
        }
        //safari
        else if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0){
            func = safari;
        }
        //Mobile Webkit
        else if ('orientation' in window && 'webkitRequestAnimationFrame' in window) {
            func = webkitMobile;
        }
        //WebKit
        else if ('webkitRequestAnimationFrame' in window) {
            func = webkit;
        }
        //Opera
        else if (navigator.userAgent.indexOf('Opera') >= 0) {
            func = opera11;
        }
        //Last one is Firefox
        //FF 18.x
        else if (window.devicePixelRatio) {
            func = firefox18;
        }
        //FF 4.0 - 17.x
        else if (firefox4().zoom > 0.001) {
            func = firefox4;
        }

        return func;
    }());


    return ({

        /**
         * Ratios.zoom shorthand
         * @return {Number} Zoom level
         */
        zoom: function () {
            return detectFunction().zoom;
        },

        /**
         * Ratios.devicePxPerCssPx shorthand
         * @return {Number} devicePxPerCssPx level
         */
        device: function () {
            return detectFunction().devicePxPerCssPx;
        }
    });
}));

$(document).ready(function() { com.gsk.mt.initialise(); });
