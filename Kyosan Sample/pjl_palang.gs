// Slave -  DLS Version 2.7

include "buildable.gs"
include "world.gs"


class pjl_palang isclass Buildable {

  int fumi_channel = 0;
  bool[] gtstate = new bool[11];
  bool[] m_arr_x = new bool[11];
  bool[] m_arr_y = new bool[11];

  bool gatestate = 0;
  bool arr_x = 0;
  bool arr_y = 0;
  bool LoopThread;

  bool sound,arrowflip;
  
  int jalur = 0;
  thread void PalangHandler(bool mode);
  thread void UpdateMain(float s);
  thread void UpdateSub(float s);

  public string get_tex_name1(){
 	return GetAsset().GetConfigSoup().GetNamedSoup("extensions").GetNamedTag("texture_bercahaya-501228-1");}
  public string get_tex_name2(){
 	return GetAsset().GetConfigSoup().GetNamedSoup("extensions").GetNamedTag("texture_bercahaya-501228-2");}

  
  public void Init(void)
  {
    inherited();
	AddHandler(me,"Fumikiri-Y88","","FumikiriLinkHandler");	
    AddHandler(me, "World", "ModuleInit", "ModuleInitHandler");
	SetMeshAnimationState("default",true); 
	UpdateMain(0.8f);
	UpdateSub(0.4f);
	SetTextureSelfIllumination(get_tex_name1(),2,2,2);	
	SetTextureSelfIllumination(get_tex_name2(),2,2,2);		
  }

   void ModuleInitHandler(Message msg) {
    if (World.GetCurrentModule() == World.SURVEYOR_MODULE) {
       PalangHandler(false);
    }
 }


	thread void UpdateMain(float s){
		bool dx;
		while(1){
			if(LoopThread){
				dx=!dx;
				SetMeshVisible("ms_1",!dx,0);
				SetMeshVisible("ms_2",dx,0);
				Sleep(s);
			}
			else
			{
			SetMeshVisible("ms_1",false,0);
			SetMeshVisible("ms_2",false,0);
			Sleep(1.0f);
			}
		}
	}
	
	thread void UpdateSub(float s){
		bool dx;
		while(1){
			if(LoopThread){
				dx=!dx;
				if(!arrowflip){
					if(arr_x){
						SetMeshVisible("a_1",!dx,0);
						SetMeshVisible("a_2",dx,0);
					}
					else{
						SetMeshVisible("a_1",false,0);
						SetMeshVisible("a_2",false,0);						
					}
					if(arr_y){
						SetMeshVisible("b_1",!dx,0);
						SetMeshVisible("b_2",dx,0);				
					}
					else{
						SetMeshVisible("b_1",false,0);
						SetMeshVisible("b_2",false,0);						
					}
				}
				else {
					if(arr_y){
						SetMeshVisible("a_1",!dx,0);
						SetMeshVisible("a_2",dx,0);
					}
					else{
						SetMeshVisible("a_1",false,0);
						SetMeshVisible("a_2",false,0);						
					}
					if(arr_x){
						SetMeshVisible("b_1",!dx,0);
						SetMeshVisible("b_2",dx,0);				
					}
					else{
						SetMeshVisible("b_1",false,0);
						SetMeshVisible("b_2",false,0);						
					}
				}
				Sleep(s);	
			}
			else
			{
			Sleep(1.0f);
			SetMeshVisible("a_1",false,0);
			SetMeshVisible("a_2",false,0);
			SetMeshVisible("b_1",false,0);
			SetMeshVisible("b_2",false,0);				
			}
		}
	}
	
	
	
	thread void PalangHandler(bool mode) {
		if(mode){
			SetMeshAnimationState("default",false); 
			LoopThread=true;
			if(sound)PlaySoundScriptEvent("play");
		}
		else 
		{
			SetMeshAnimationState("default",true); 
			//Sleep(2.0f);
			LoopThread=false;
			StopSoundScriptEvent("play");
		}
			
	}
		
  
  thread void FumikiriLinkHandler(Message msg) {
		
		string sb = msg.minor;
		int decode = Str.ToInt(sb);
		int temp_m_channel;
		//Interface.Print("MSG Rec encode = " + decode);
		
		temp_m_channel = decode / 10000;
		if(temp_m_channel==fumi_channel){
			//m_channel = temp_m_channel;
			jalur = Str.ToInt(sb[sb.size()-4,sb.size()-3]);
			m_arr_x[jalur] = (bool)Str.ToInt(sb[sb.size()-3,sb.size()-2]);
			m_arr_y[jalur] = (bool)Str.ToInt(sb[sb.size()-2,sb.size()-1]);
			gtstate[jalur] = (bool)Str.ToInt(sb[sb.size()-1,sb.size()]);
			//Interface.Print(decode + "gtstate[" + jalur + "] = " + gtstate[jalur] );
					
			if(m_arr_x[0] or
			   m_arr_x[1] or
			   m_arr_x[2] or
			   m_arr_x[3] or
			   m_arr_x[4] or
			   m_arr_x[5] or
			   m_arr_x[6] or
			   m_arr_x[7] or
			   m_arr_x[8] or
			   m_arr_x[9] or
			   m_arr_x[10]){
					arr_x = true;
			   }
			 else
			 {
					arr_x = false;
			 }
			 
			 
			if(m_arr_y[0] or
			   m_arr_y[1] or
			   m_arr_y[2] or
			   m_arr_y[3] or
			   m_arr_y[4] or
			   m_arr_y[5] or
			   m_arr_y[6] or
			   m_arr_y[7] or
			   m_arr_y[8] or
			   m_arr_y[9] or
			   m_arr_y[10]){
					arr_y = true;
			   }
			 else
			 {
					arr_y = false;
			 }
			 
			 
			if(gtstate[0] or
			   gtstate[1] or
			   gtstate[2] or
			   gtstate[3] or
			   gtstate[4] or
			   gtstate[5] or
			   gtstate[6] or
			   gtstate[7] or
			   gtstate[8] or
			   gtstate[9] or
			   gtstate[10]){
					//Interface.Print("TRUE");
					PalangHandler(true);
			   }
			 else
			 {
			   //Interface.Print("FALSE");
			   PalangHandler(false);
			 }
		}

	}
	
	
	public void SetProperties(Soup sigconfig)
	{
		inherited(sigconfig);
		fumi_channel = sigconfig.GetNamedTagAsInt("fumi_channel");
		sound = sigconfig.GetNamedTagAsBool("sound");
		arrowflip = sigconfig.GetNamedTagAsBool("arrowflip");
	}
	
	public Soup GetProperties(void)
	{
	Soup sigconfig = inherited();	
	sigconfig.SetNamedTag("fumi_channel",fumi_channel);
	sigconfig.SetNamedTag("sound",sound);	
	sigconfig.SetNamedTag("arrowflip",arrowflip);	
	return sigconfig;
	}
	
	public string GetDescriptionHTML(void) {
		string html = inherited();	
		html = html + "<br><font color=#ffffcc size=3><b>JOS V.2.0 : Crossing Settings </a></font><br>";		
		html = html + "<font color=#ffffcc size=2><b> - Channel : <a href=live://property/fumi_channel>" + fumi_channel + "</a></font><br>";
		html = html + "<font color=#ffffcc size=3><b> - With Sound ? : "  + "<a href=live://property/sound>";		
		if(sound){
			html = html + "Yes</a></font><br>";}
		else {
			html = html + "No</a></font><br>";
		}
			html = html + "<font color=#ffffcc size=3><b> - Penunjuk Arah Flip ? : "  + "<a href=live://property/arrowflip>";		
		if(arrowflip){
			html = html + "Yes</a></font><br>";}
		else {
			html = html + "No</a></font><br>";
		}
	
		
		
		html = html + "<br><font color=#ffffcc size=1> If you want to redistribute this assets, please contact me at <i>cecehduakosongtiga@gmail.com</i> <br> @2022 JIRCTrainz All Right Reserved</font><br>";
		return html;	
	}      

	void LinkPropertyValue(string PID) {
		if (PID == "sound") 
		{
			sound=!sound;
		} 	
		if (PID == "arrowflip") 
		{
			arrowflip=!arrowflip;
		} 
	}
	
    string GetPropertyType(string PID)
    {
		string result = inherited(PID);
		if (PID == "fumi_channel") result = "int";
		if (PID == "sound") result = "link";
		if (PID == "arrowflip") result = "link";
		return result;		
	}	
	
	string GetPropertyDescription(string PID)
	{
    string result = inherited(PID);
		if (PID == "fumi_channel")
		{
			result = "Enter a Channel Number";
		}
	return result;
	}

    void SetPropertyValue(string PID, int value)
	{
		if (PID == "fumi_channel") fumi_channel = value;
		else inherited(PID, value);
    }	

	
  
};


