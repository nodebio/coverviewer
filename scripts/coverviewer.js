//CoverViewer Class
var CoverViewer = function(id)
{
  //App info
  this.info = {};
  this.info.version = '0.1.0'; //App Version
  this.info.name = 'CoverViewer'; //App name
  this.info.website = 'https://nodebio.github.io/coverviewer'; //App website

  //Start the default values
  this.default = {};
  this.default.buildtime = 500; //Default build time
  this.default.maxregion = 100000; //Max region size
  //this.default.region = '1:6527454-6529974'; //Test region
  this.default.region = '1:6500000-6600000'; //Test region
  this.default.test = false; //Enable/disable test mode

  //Parent div
  this.parent = id;

  //App
  this.app = {};
  this.app.id = this.parent + '-cover'; //App ID
  this.app.class = 'CoverViewer'; //App Class
  this.app.border = false; //App border
  this.app.padding = 0; //App pading
  this.app.width = 0; //App width
  this.app.height = 0; //App height

  //Cursor
  this.cursor = {};
  this.cursor.move = this.app.class + '-move'; //Cursor move
  this.cursor.hand = this.app.class + '-hand'; //Cursor hand

  //Loading div
  this.loading = {};
  this.loading.id = this.app.id + '-loading'; //Loading ID
  this.loading.width = '100%'; //Loading height
  this.loading.height = 0; //Loading height
  this.loading.class = this.app.class + '-loading'; //Loading css class
  this.loading.show = true; //Loading show
  this.loading.visible = false; //Loading visible

  //Loading screen
  this.loading.screen = {};
  this.loading.screen.id = this.loading.id + '-screen'; //Loading screen ID
  this.loading.screen.width = '100%'; //Loading screen width
  this.loading.screen.height = 0; //Loading screen height
  this.loading.screen.class = this.loading.class + '-screen'; //Loading screen css class
  this.loading.screen.show = true; //Show true
  this.loading.screen.padding = {"top": 100}; //Padding

  //Navbar
  this.navbar = new jvizToolNavbar({});
  this.navbar.id = this.app.id + '-navbar'; //Navbar ID
  this.navbar.width = 0; //Navbar width
  this.navbar.height = 0; //Navbar height
  this.navbar.show = true; //Show navbar
  this.navbar.class = this.app.class + '-navbar'; //Navbar css class

  //Navbar buttons
  this.navbar.btn = {};
  this.navbar.btn.id = this.navbar.id + '-btn'; //Navbar button
  this.navbar.btn.class = this.navbar.class + '-btn'; //Navbar class

  //Navbar button karyotypes
  this.navbar.btn.karyotypes = new jvizToolNavbarBtnIcon({});
  this.navbar.btn.karyotypes.id = this.navbar.btn.id + '-karyotypes'; //Navbar karyotypes button ID
  this.navbar.btn.karyotypes.class = this.navbar.btn.class + '-karyotypes'; //Navbar karyotypes button class
  this.navbar.btn.karyotypes.show = true; //Navbar karyotypes button show
  this.navbar.btn.karyotypes.title = 'Open karyotype'; //Navbar karyotypes button title

  //Navbar button search
  this.navbar.btn.search = new jvizToolNavbarBtnIcon({});
  this.navbar.btn.search.id = this.navbar.btn.id + '-search'; //Navbar search button ID
  this.navbar.btn.search.class = this.navbar.btn.class + '-search'; //Navbar search button class
  this.navbar.btn.search.show = true; //Navbar search button show
  this.navbar.btn.search.title = 'Find region'; //Navbar search button title

  //Navbar button labels
  this.navbar.btn.labels = new jvizToolNavbarBtn({});
  this.navbar.btn.labels.id = this.navbar.btn.id + '-labels'; //Navbar labels button id
  this.navbar.btn.labels.class = this.navbar.btn.class + '-labels'; //Navbar labels button class
  this.navbar.btn.labels.show = true; //Navbar show labels button
  this.navbar.btn.labels.title = 'Labels'; //Navbar labels button title

  //Navbar label
  this.navbar.label = new jvizToolNavbarLabel({});
  this.navbar.label.id = this.navbar.id + '-label'; //Label ID
  this.navbar.label.class = this.navbar.class + '-label'; //Label class
  this.navbar.label.text = 'Find region: '; //Label text

  //Navbar Input
  this.navbar.input = new jvizToolNavbarInput({});
  this.navbar.input.id = this.navbar.id + '-input'; //Input ID
  this.navbar.input.class = this.navbar.class + '-input'; //Navbar input class
  this.navbar.input.show = true; //Navbar input show
  this.navbar.input.placeholder = 'Region name'; //Navbar input placeholder

  //Navbar Input alert
  this.navbar.input.alert = {};
  this.navbar.input.alert.text = 'Region not found'; //Alert text
  this.navbar.input.alert.time = 3000; //Alert time

  //Register the navbar elements
  this.navbar.AddItem(this.navbar.btn.karyotypes);
  this.navbar.AddItem(this.navbar.input);
  this.navbar.AddItem(this.navbar.btn.search);
  this.navbar.AddItem(this.navbar.btn.labels);

  //Alert
  this.alert = new jvizAlert({ id: this.app.id + '-alert', class: this.app.class + '-alert' });

  //Panels
  this.panel = {};
  this.panel.preview = new jvizToolPanel({ id: this.app.id + '-panel-preview', class: this.app.class + '-panel' });
  this.panel.tracks = new jvizToolPanel({ id: this.app.id + '-panel-tracks', class: this.app.class + '-panel' });

  //Foot
  this.foot = {};
  this.foot.id = this.app.id + '-foot'; //Foot ID
  this.foot.show = true; //Show foot
  this.foot.class = this.app.class + '-foot'; //Foot css class
  this.foot.width = 0; //Foot div width
  this.foot.height = 0; //Foot div height

  //Settings panel
  this.settings = {};
  this.settings.id = this.app.id + '-settings'; //Settings ID
  this.settings.class = this.app.class + '-settings'; //Settings class
  this.settings.show = false;
  this.settings.gauss = this.settings.id + '-gauss'; //Settings gauss ID
  this.settings.apply = this.settings.id + '-apply'; //Settings apply ID

  //Draw adapter
  this.draw = {};
  this.draw.delay = 500; //Draw delay time
  this.draw.region = ''; //Full region for draw
  this.draw.chromosome = ''; //Chromosome draw
  this.draw.start = 0; //Start position
  this.draw.end = 0; //End position
  this.draw.status = ''; //Draw status
  this.draw.delay = 100; //Draw delay time

  //Core
  this.core = {};
  this.core.running = false; //Core running
  this.core.region = null; //Region selected
  this.core.fullregion = null; //Full region to draw
  this.core.resized = false; //For check if window has resized

  //Data
  this.data = {};
  this.data.nullvalues = 0; //Data null values
  this.data.specie = 'hsapiens'; //Specie name
  this.data.assembly = 'grch37'; //Specie assembly

  //Data for coverage
  this.data.cover = {};
  this.data.cover.data = null; //Cover data container
  this.data.cover.busy = false; //Cover data busy
  this.data.cover.error = false; //Cover data error
  this.data.cover.url = ''; //Cover data url
  this.data.cover.parser = null; //Cover data parser
  this.data.cover.max = 0; //Cover data max value
  this.data.cover.min = 0; //Cover data min value
  this.data.cover.region = ''; //Region for draw
  this.data.cover.color = null; //Cover color function
  this.data.cover.label = null; //Cover label function
  this.data.cover.fixgaps = true; //Fix gaps on data

  //Data for karyotypes
  this.data.karyotypes = {};
  this.data.karyotypes.url = ''; //Karyotypes url
  this.data.karyotypes.busy = false; //Getting karyotypes is busy
  this.data.karyotypes.error = false; //Karyotypes import error
  this.data.karyotypes.parser = null; //Karyotypes parser
  this.data.karyotypes.data = []; //Karyotypes data
  this.data.karyotypes.json = null; //Karyotypes from json object

  //Data for regions
  this.data.regions = {};
  this.data.regions.url = ''; //Regions url
  this.data.regions.busy = false; //Getting regions is busy
  this.data.regions.error = false; //Regions import error
  this.data.regions.parser = null; //Regions data parser
  this.data.regions.data = []; //Regions data
  this.data.regions.json = null; //Regions from json object

  //Data for names
  this.data.names = {};
  this.data.names.url = ''; //Names url
  this.data.names.busy = false; //Names busy
  this.data.names.error = false; //Names error
  this.data.names.parser = null; //Names data parser
  this.data.names.data = []; //Names data
  this.data.names.json = null; //Names from json object

  //Data for genes
  this.data.genes = {};
  this.data.genes.url = ''; //Genes url for data
  this.data.genes.parser = null; //Genes parser function
  this.data.genes.busy = false; //Genes data busy
  this.data.genes.error = false; //Genes data error
  this.data.genes.label = null; //Genes Label function
  this.data.genes.info = {}; //Genes Info box
  this.data.genes.info.title = null; //Genes info title function
  this.data.genes.info.content = null; //Genes info content function
  this.data.genes.list = []; //Genes list
  this.data.genes.specie = 'hsapiens'; //Specie name
  this.data.genes.assembly = 'grch37'; //Specie assembly

  //Data for exons
  this.data.exons = {};
  this.data.exons.url = ''; //Exons data url
  this.data.exons.busy = false; //Exons data busy
  this.data.exons.use = false; //If user is using the exons addon
  this.data.exons.data = null; //Exons data
  this.data.exons.parser = null; //Exons data parser
  this.data.exons.error = false; //Exons data import error
  this.data.exons.num = 0; //Exons number

  //Preview track
  this.preview = new jvizToolKaryotypeTrack({ id: this.app.id + '-preview', class: this.app.class + '-track', layers: 2 });
  this.preview.title = 'Full preview'; //Preview title
  this.preview.width = 0; //Preview width
  //this.preview.height = 150; //Preview height
  this.preview.show = true; //Preview show
  this.preview.busy = false; //Preview is busy
  this.preview.data = null; //Preview data
  this.preview.opacity = 0.6; //Lines opacity
  this.preview.stroke = 1; //Stroke width
  this.preview.mouse = false; //Mouse active

  //Preview head
  this.preview.head.show = true;

  //Preview head action button
  this.preview.head.action.title = 'Return'; //Return title

  //Preview draw
  //this.preview.draw.margin = { top: 40, bottom: 40, left: 50, right: 50 }; //Preview margin
  this.preview.draw.width = 0; //Preview draw width
  this.preview.draw.height = 0; //Preview draw height
  this.preview.draw.start = 0; //Start position
  this.preview.draw.end = 0; //End position
  this.preview.draw.scale = 0; //Scale

  //Preview draw zone
  this.preview.zone = {};
  this.preview.zone.posx = 0; //Preview zone position x
  this.preview.zone.posy = 0; //Preview zone position y
  this.preview.zone.width = 0; //Preview zone width
  this.preview.zone.height = 40; //Preview zone height

  //Preview window
  this.preview.window = {};
  this.preview.window.start = 0; //Window start
  this.preview.window.end = 0; //Window end
  this.preview.window.width = 0; //Window width
  this.preview.window.height = 0; //Window height
  this.preview.window.fill = { color: '#ed9e48', opacity: 0.2 }; //Window fill

  //Preview click
  this.preview.click = {};
  this.preview.click.point = 0; //Click point
  this.preview.click.start = 0; //Original start

  //Preview region coordinates
  this.preview.region = {};
  this.preview.region.start = 0; //Region coordinates start
  this.preview.region.end = 0; //Region coordinates end

  //Preview lavel
  this.preview.label = {};
  this.preview.label.width = 150; //Label width
  this.preview.label.height = 22; //Label height
  this.preview.label.posx = 0; //Label position x
  this.preview.label.posy = 0; //Label position y
  this.preview.label.fill = '#ed9e48'; //Label fill color
  this.preview.label.text = { font: 'Quicksand', size: '11px', align: 'center', color: '#ffffff'}; //Font
  this.preview.label.margin = 8; //Margin top
  this.preview.label.radius = 5; //Label rectangle radius

  //Cover track
  this.cover = new jvizToolCanvasTrack({ id: this.app.id + '-cover', class: this.app.class + '-track', layers: 2 });
  this.cover.title = 'Coverage'; //Cover title
  this.cover.height = 250; //Cover div height
  this.cover.data = null; //Cover data
  this.cover.show = true; //Show cover track
  this.cover.busy = false; //Cover is busy
  this.cover.stroke = 2; //Stroke width
  this.cover.mouse = false; //Mouse active

  //Cover default values
  this.cover.default = {};

  //Default height
  this.cover.default.height = {};
  this.cover.default.height.karyotypes = 150; //Default cover height for karyotypes view
  this.cover.default.height.chromosome = 150; //Default cover height for chromsome view
  this.cover.default.height.cover = 250; //Default cover height for cover view

  //Cover click
  this.cover.click = {};
  this.cover.click.point = 0//Click point
  this.cover.click.first = false; //For prevent errors
  this.cover.click.start = 0; //Click orginal position
  this.cover.click.value = 0; //Click value

  //Cover draw
  this.cover.draw.margin = { top: 65, bottom: 40, right: 50, left: 50 }; //Cover draw margin
  this.cover.draw.width = 0; //Cover draw width
  this.cover.draw.height = 0; //Cover draw height
  this.cover.draw.start = 0; //Cover draw start
  this.cover.draw.end = 0; //Cover draw end
  this.cover.draw.length = 0; //Cover draw length

  //Cover axes
  this.cover.axes = {};
  this.cover.axes.class = 'cover-track-cover-axes'; //Cover axes class

  //Cover hover line
  this.cover.hover = {};
  this.cover.hover.stroke = { color: '#38b1eb', opacity: 0.4 }; //Line class
  this.cover.hover.width = 1; //Line width
  this.cover.hover.height = 0; //Line height
  this.cover.hover.circle = []; //Circle list
  this.cover.hover.radius = 4; //Circle radius
  this.cover.hover.position = 0; //Hover position

  //Cover label for value
  this.cover.value = {};
  this.cover.value.width = 50; //Label width
  this.cover.value.height = 15; //Label height
  this.cover.value.margin = 15; //Margin right
  this.cover.value.text = { font: 'Quicksand', size: '11px', align: 'center', color: '#ffffff' }; //Font
  this.cover.value.radius = 5; //value label Rectangle radius
  this.cover.value.mindiff = 7; //Minim difference

  //Cover label
  this.cover.label = {};
  this.cover.label.fill = { color: '#38b1eb' }; //Label fill
  this.cover.label.width = 90; //Label width
  this.cover.label.height = 22; //Label height
  this.cover.label.posx = 0; //Position x
  this.cover.label.posy = 0; //Position y
  this.cover.label.text = { font: 'Quicksand', size: '12px', align: 'center', color: '#ffffff' }; //Label text
  this.cover.label.margin = 8; //Margin top
  this.cover.label.radius = 5; //Label rectangle radius

  //No cover
  this.cover.nocover = {};
  this.cover.nocover.width = 650; //No cover width
  this.cover.nocover.height = 70; //No cover height
  this.cover.nocover.posx = 0; //No cover position x
  this.cover.nocover.posy = 0; //No cover position y
  this.cover.nocover.radius = 5; //No cover radius
  this.cover.nocover.color = '#e2ebf4'; //No cover background color

  //No cover title
  this.cover.nocover.title = {};
  this.cover.nocover.title.posy = 28; //No cover title position y
  this.cover.nocover.title.font = 'Quicksand-Bold'; //No cover title font
  this.cover.nocover.title.size = '15px'; //No cover title size
  this.cover.nocover.title.text = 'Use the upper panel to select a chromosome. Then, select the region of interest.'; //Title text
  this.cover.nocover.title.color = '#4a526c'; //No cover title color
  this.cover.nocover.title.align = 'center'; //No cover title align

  //Bam labels dialog
  this.labels = new jvizDialog({ id: this.app.id + '-labels', class: this.app.class + '-labels' });
  this.labels.title = 'BAM Labels';
  this.labels.created = false; //Labels created

  //Labels row
  this.labels.row = {};
  this.labels.row.class = this.labels.class + '-row'; //Labels row class

  //Labels names
  this.labels.names = {};
  this.labels.names.class = this.labels.class + '-names'; //Labels names class

  //Labels Done
  this.labels.done = {};
  this.labels.done.id = this.labels.id + '-done'; //Labels done ID
  this.labels.done.class = this.labels.class + '-done'; //Labels done class
  this.labels.done.title = 'Done'; //Labels done title

  //Labels switch
  this.labels.switch = {};
  this.labels.switch.id = this.labels.id + '-switch'; //Labels switch id
  this.labels.switch.class = this.labels.class + '-switch'; //Labels switch class

  //Gene track
  this.genes = new jvizToolFeatureTrack({ id: this.app.id + '-genes', class: this.app.class + '-track', layers: 1 });
  this.genes.title = 'Genes'; //Genes track title
  this.genes.show = true; //Genes show
  this.genes.busy = false; //Genes is busy
  this.genes.length = 0; //Genes length
  this.genes.mouse = false; //Genes mouse event
  this.genes.moved = false; //Genes moved
  this.genes.click = 0; //Click point
  this.genes.clickfirst = false; //For prevent errors
  this.genes.clickstart = 0; //Click orginal position
  this.genes.list = []; //Genes positions list

  //Genes draw
  this.genes.draw.width = 0; //Genes draw width
  this.genes.draw.height = 0; //Genes draw height
  this.genes.draw.margin = { top: 50, bottom: 40, left: 50, right: 50 }; //Genes div margin

  //Genes default values
  this.genes.default = {};

  //Genes default height values
  this.genes.default.height = {};
  this.genes.default.height.karyotypes = 30; //Default karyotypes height
  this.genes.default.height.chromosome = 30; //Default chromosome height

  //Genes strand
  this.strand = {};
  this.strand.text = { font: 'Quicksand', size: '11px' }; //Strand text font

  //Forward strand
  this.strand.forward = {}; //Positive strand (forward)
  this.strand.forward.index = 0; //Positive strand index for styles
  this.strand.forward.id = '1'; //Positive strand id
  this.strand.forward.text = ' (Forward strand)'; //Positive strand text
  this.strand.forward.color = '#38b1eb'; //Forward strand color
  this.strand.forward.title = '> '; //Forward strand title

  //Reverse strand
  this.strand.reverse = {}; //Genes negative strand (reverse)
  this.strand.reverse.index = 1; //Negative strand index for styles
  this.strand.reverse.id = '-1'; //Negative strand id
  this.strand.reverse.text = ' (Reverse strand)'; //Negative strand text
  this.strand.reverse.color = '#ea685a'; //Reverse strand color
  this.strand.reverse.title = '< '; //Reverse strand title

  //Genes element
  this.genes.el = {};
  this.genes.el.block = 0; //Full element size
  this.genes.el.rect = 8; //Genes element rectangle height
  this.genes.el.text = 15; //Genes element text height
  this.genes.el.exon = 8; //Genes element exon
  this.genes.el.margin = 10; //Margin top and bottom

  //Genes box
  this.genes.box = {};
  this.genes.box.id = this.genes.id + '-box'; //Genes box id
  this.genes.box.width = 0; //Genes box width
  this.genes.box.height = 0; //Genes box height
  this.genes.box.show = true; //Genes box show

  //Genes Info
  this.genes.info = {};
  this.genes.info.id = this.genes.box.id + '-info'; //Genes Info ID
  this.genes.info.width = 180; //Genes Info width
  this.genes.info.height = 0; //Genes Info height
  this.genes.info.class = 'cover-track-genes-info'; //Genes Info class
  this.genes.info.padding = 5; //Genes Info padding
  this.genes.info.posx = 0; //Genes Info posx
  this.genes.info.posy = 0; //Genes Info posy

  //Genes tooltip
  this.genes.tooltip = new jvizToolTip({ id: this.genes.id + '-tooltip', class: this.app.class + '-genes-tooltip' });
  this.genes.tooltip.width = 200; //Genes tooltip width

  //No genes
  this.genes.nogenes = {};
  this.genes.nogenes.width = 650; //No genes width
  this.genes.nogenes.height = 50; //No genes height
  this.genes.nogenes.margin = 10; //No genes margin
  this.genes.nogenes.radius = 5; //No genes radius
  this.genes.nogenes.color = '#e2ebf4'; //No genes background color

  //No genes title
  this.genes.nogenes.title = {};
  this.genes.nogenes.title.posy = 16; //No genes title position y
  this.genes.nogenes.title.font = 'Quicksand-Bold'; //No genes title font
  this.genes.nogenes.title.size = '16px'; //No genes title size
  this.genes.nogenes.title.text = 'Select a region on a chromosome to visualize the genes'; //Title text
  this.genes.nogenes.title.color = '#4a526c'; //No genes title color
  this.genes.nogenes.title.align = 'center'; //No genes title align

  //Control points
  this.points = {};
  this.points.gap = 1000; //Control points nucleotides gap
  this.points.stroke = { color: '#b8c6d6', width: 1, opacity: 0.3 }; //Points class
  this.points.text = { font: 'Quicksand', size: '12px', color: '#b8c6d6' };
  this.points.letter = 'K'; //Control points letter
  this.points.margin = 20; //Points margin
  this.points.textmargin = {'top': 15, 'left': 4}; //Points text margin

  //Marks
  this.marks = {};
  this.marks.fill = '#b490f5'; //Marks fill color
  this.marks.opacity = {}; //Marks opacity
  this.marks.opacity.preview = 0.2; //Marks opacity preview
  this.marks.opacity.cover = 0.2; //Marks opacity cover
  this.marks.label = ''; //Marks label

  //Marks position
  this.marks.position = {};
  this.marks.position.width = 150; //Marks position width
  this.marks.position.height = 20; //Marks position height
  this.marks.position.fill = '#b490f5'; //Marks position fill color
  this.marks.position.triangle = 6; //Marks position triangle
  this.marks.position.radius = 5; //Marks position radius

  //Marks position text
  this.marks.position.text = {};
  this.marks.position.text.color = '#ffffff'; //Marks position text color
  this.marks.position.text.font = 'Quicksand'; //Marks position text font
  this.marks.position.text.align = 'center'; //Marks position text align
  this.marks.position.text.size = '11px'; //Marks position text size
  this.marks.position.text.margin = 3; //Marks position text margin

  //Colors
  this.colors = [];
  this.colors.push({"name": "blue", "hex": "#2962FF"}); //Blue
  this.colors.push({"name": "red", "hex": "#D50000"}); //Red
  this.colors.push({"name": "purple", "hex": "#D500F9"}); //Purple
  this.colors.push({"name": "green", "hex": "#00C853"}); //Green
  this.colors.push({"name": "orange","hex": "#FF9100"}); //Orange
  this.colors.push({"name": "brown", "hex": "#4E342E"}); //Brown
  this.colors.push({"name": "grey", "hex": "#607D8B"}); //Grey
  this.colors.push({"name": "teal", "hex": "#009688"}); //Teal
  this.colors.push({"name": "pink", "hex": "#FF4081"}); //Pink
  this.colors.push({"name": "black", "hex": "#000000"}); //Black

  //Bams files
  this.bams = {};
  this.bams.num = 0; //Number of bams
  this.bams.empty = []; //Empty cover
  this.bams.color = []; //Color for each bams
  this.bams.label = []; //Label for each bam
  this.bams.active = []; //Bams active
  this.bams.opacity = 0.09; //Opacity for disabled bams

  //Gauss filter
  this.gauss = {};
  this.gauss.def = 3; //Gauss Default filter times
  this.gauss.times = 3; //Gauss filter times
  this.gauss.min = 0; //Gauss min filter times
  this.gauss.max = 10; //Gauss max filter times

  //Tracks list
  this.tracks = [];

  //Build Time out
  //CoverViewerBuildTimeOut(this);
};
