// Slave -  DLS Version 2.7

include "crossing.gs"
include "world.gs"


class pjl_stopper isclass Crossing {

  int fumi_channel = 0;
  bool[] gtstate = new bool[11];  
  
  int jalur = 0;
  thread void PalangHandler(bool mode);
  
  public void Init(void)
  {
    inherited();
	AddHandler(me,"Fumikiri-Y88","","FumikiriLinkHandler");	
    AddHandler(me, "World", "ModuleInit", "ModuleInitHandler");	
  }

   void ModuleInitHandler(Message msg) {
    if (World.GetCurrentModule() == World.SURVEYOR_MODULE) {
       PalangHandler(false);
    }
 }
	
	thread void PalangHandler(bool mode) {
		if(mode){
			me.SetCrossingState(2); //close
		}
		else 
		{
			me.SetCrossingState(0); //open
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
			gtstate[jalur] = (bool)Str.ToInt(sb[sb.size()-1,sb.size()]);
			//Interface.Print(decode + "gtstate[" + jalur + "] = " + gtstate[jalur] );
			 
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
	}
	
	public Soup GetProperties(void)
	{
	Soup sigconfig = inherited();	
	sigconfig.SetNamedTag("fumi_channel",fumi_channel);
	return sigconfig;
	}
	
	public string GetDescriptionHTML(void) {
		string html = inherited();	
		html = html + "<br><font color=#ffffcc size=3><b>JOS V.2.0 : Stopper Settings </a></font><br>";		
		html = html + "<font color=#ffffcc size=2><b> - Channel : <a href=live://property/fumi_channel>" + fumi_channel + "</a></font><br>";
		
		html = html + "<br><font color=#ffffcc size=1> If you want to redistribute this assets, please contact me at <i>cecehduakosongtiga@gmail.com</i> <br> @2022 JIRCTrainz All Right Reserved</font><br>";
		return html;	
	}      


	
    string GetPropertyType(string PID)
    {
		string result = inherited(PID);
		if (PID == "fumi_channel") result = "int";
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


