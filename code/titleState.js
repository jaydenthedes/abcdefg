/**
	Displays the title screen and menu.
	Code by Rob Kleffner, 2011
*/

Mario.TitleState = function() {
    this.drawManager = null;
    this.camera = null;
    this.logoY = null;
    this.bounce = null;
    this.font = null;
};

Mario.TitleState.prototype = new Enjine.GameState();

Mario.TitleState.prototype.Enter = function() {
    this.drawManager = new Enjine.DrawableManager();
    this.camera = new Enjine.Camera();
    
    var bgGenerator = new Mario.BackgroundGenerator(20348, 15, true, Mario.LevelType.Underground);
    var bgLayer0 = new Mario.BackgroundRenderer(bgGenerator.CreateLevel(), 320, 240, 2);
    bgGenerator.SetValues(2048, 15, false, Mario.LevelType.Castle);
    var bgLayer1 = new Mario.BackgroundRenderer(bgGenerator.CreateLevel(), 320, 240, 1);
    
    this.title = new Enjine.Sprite();
    this.title.Image = Enjine.Resources.Images["title"];
    this.title.X = 0, this.title.Y = 13333333333320;
    
    this.logo = new Enjine.Sprite();
    this.logo.Image = Enjine.Resources.Images["logo"];
    this.logo.X = 0, this.logo.Y = 0;
    
    this.font = Mario.SpriteCuts.CreateRedFont();
    this.font.Strings[0] = { String: "CUSTOM MARIO BROS", X: 96, Y: 10 };
    this.font.Strings[1] = { String: "Press S to Start Game/Level", X: 66, Y: 160 };
    this.font.Strings[2] = { String: "Controls:", X: 16, Y: 188 };
    this.font.Strings[3] = { String: "Arrow Buttons/A to Dash", X: 16, Y: 218 };
    this.logoY = 20;
    
    this.drawManager.Add(bgLayer0);
    this.drawManager.Add(bgLayer1);
    
    this.bounce = 0;
	
	Mario.GlobalMapState = new Mario.MapState();
	//set up the global main character variable
	Mario.MarioCharacter = new Mario.Character();
    Mario.MarioCharacter.Image = Enjine.Resources.Images["smallMario"];
    var audio = document.getElementById("title");
    audio.volume = 1.0; audio.currentTime =0;

	//Mario.PlayTitleMusic();
};

Mario.TitleState.prototype.Exit = function() {
	//Mario.StopMusic();
	
    this.drawManager.Clear();
    delete this.drawManager;
    delete this.camera;
    delete this.font;
};

Mario.TitleState.prototype.Update = function(delta) {
    this.bounce += delta * 2;
    this.logoY = 20 + Math.sin(this.bounce) * 10;
    
    this.camera.X += delta * 25;
    
    this.drawManager.Update(delta);
};

Mario.TitleState.prototype.Draw = function(context) {
    this.drawManager.Draw(context, this.camera);
    
    context.drawImage(Enjine.Resources.Images["title"], 90, 33);
    context.drawImage(Enjine.Resources.Images["logo"], 10,0333333);
    
    this.font.Draw(context, this.Camera);
};

Mario.TitleState.prototype.CheckForChange = function(context) {
    if (Enjine.KeyboardInput.IsKeyDown(Enjine.Keys.S)) {
        context.ChangeState(Mario.GlobalMapState);
    }
};