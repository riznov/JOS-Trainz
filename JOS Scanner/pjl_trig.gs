include "common.gs"

class pjl_trig isclass Trackside
{

	Vehicle denshaX,denshaY;
	bool detX,detY,dirX,dirY;
    int fumi_channel = 0;
	//int m_channel = 0;
	//bool m_gatestate = 0;
	//Asset red;
	
	int jauhdist = 0;
	int dekatdist = 0;
	int jalur = 0;
	
	bool arr_x,arr_y,m_arr_x,m_arr_y;
	bool msgsent=0;
	bool SpeedVar = 0;
	
	//gate_var
  
  bool gatestate,gatestateX,gatestateY = 0;
  float trainXdist = 9999;
  float trainYdist = 9999;
  float ydist,xdist;
  

  void ScanX(void)
  {
	detX = false;
	denshaX = null;
	trainXdist = 9999;
	int i = 0;

    GSTrackSearch detect_x = me.BeginTrackSearch(true);
	MapObject densha_x;
	
	while(i<100){
	densha_x = detect_x.SearchNext();	
	if (cast<Vehicle>densha_x){
			detX = true;
			denshaX = cast<Vehicle>densha_x;
			trainXdist = detect_x.GetDistance();
			//Interface.Print("detX = true");
	 break;
	}
	 else{
		detX = false;
		i++;
		//Interface.Print("detX = false");
	}	 	
	}		 
  }	
  
  void ScanY(void)
  {
	detY = false;
	denshaY = null;
	trainYdist = 9999;
	int i = 0;
	

	GSTrackSearch detect_y = me.BeginTrackSearch(false);
	MapObject densha_y;
    
	while(i<100){
	densha_y = detect_y.SearchNext();
	if (cast<Vehicle>densha_y){
			detY = true;
			denshaY = cast<Vehicle>densha_y;
			trainYdist = detect_y.GetDistance();
			//Interface.Print("detY = true");
	 break;
	 }
	 else{
		detY = false;
		i++;
		//Interface.Print("detY = false");	 
	 }
	}	  		
  }	
  
  thread void fumikiri_sys(){
	while(1){
				
		//Scan X
		ScanX();
	    xdist = trainXdist;
		Sleep(0.1f);
		ScanX();
		xdist = xdist - trainXdist;

		if(xdist>0.1)dirX=true;
		else if (xdist<-0.1)dirX=false;
		//Interface.Print("xdist = " + xdist);
		//enter radius jauh
		if(SpeedVar){
			if(trainXdist < jauhdist and xdist > 0 and detX)gatestateX=true;
			//enter radius dekat
			else if(trainXdist < dekatdist and xdist <= 0 and detX)gatestateX=true;
			//keluar radius dekat
			else if(trainXdist > dekatdist and xdist < 0 and detX)gatestateX=false;
			//tidak ada kereta
			else {gatestateX=false;} 
		}
		else
		{
			if(trainXdist < jauhdist and dirX and detX)gatestateX=true;
			//enter radius dekat
			else if(trainXdist < dekatdist and !dirX and detX)gatestateX=true;
			//keluar radius dekat
			else if(trainXdist > dekatdist and !dirX and detX)gatestateX=false;
			//tidak ada kereta
			else {gatestateX=false;} 		
		}


		//Scan Y
		ScanY();
	    ydist = trainYdist;
		Sleep(0.1f);
		ScanY();
		ydist = ydist - trainYdist;
		if(ydist>0.1)dirY=true;
		else if (ydist<-0.1)dirY=false;


		//Interface.Print("ydist = " + ydist);		//enter radius jauh
		if(SpeedVar){
			if(trainYdist < jauhdist and ydist > 0 and detY)gatestateY=true;
			//enter radius dekat
			else if(trainYdist < dekatdist and ydist <= 0 and detY)gatestateY=true;
			//keluar radius dekat
			else if(trainYdist > dekatdist and ydist < 0 and detY)gatestateY=false;
			//tidak ada kereta
			else {gatestateY=false;} 		
		}
		else
		{
			if(trainYdist < jauhdist and dirY and detY)gatestateY=true;
			//enter radius dekat
			else if(trainYdist < dekatdist and !dirY and detY)gatestateY=true;
			//keluar radius dekat
			else if(trainYdist > dekatdist and !dirY and detY)gatestateY=false;
			//tidak ada kereta
			else {gatestateY=false;} 		
		}		
		
		if(!detX or !detY)gatestate = false;
		
		if(gatestateX or gatestateY) gatestate = true;
		else gatestate = false;
		
		
		if(gatestateX)arr_x=true;
		else arr_x=false;
		
		if(gatestateY)arr_y=true;
		else arr_y=false;
		
		//arrow 
		//if(trainXdist < jauhdist and trainXdist > dekatdist and detX)arr_x=true;
		//if(trainYdist < jauhdist and trainYdist > dekatdist and detY)arr_y=true;		
		
		/*Teknik multiplexing pesan
			Headname : Fumikiri -X23 + "int 3 or 4"
				Channel : Ch x 10000 = >  Ch/0/0/0
				arrow_x : ax x 100 = > Ch/ax/0/0
				arrow_y : ay x 10 = > Ch/ax/ay/0
				gtstate : gs x 1 = > Ch/ax/ay/gs => output Ch + 3 digit nomor
		
	      Teknik demultiplexing tinggal dibalik menggunakan fungsi modulus atau string array
		*/
		
		//code untuk versi2 = Y88
		if(gatestate and !msgsent){
			Router.PostMessage(me.GetId(), Router.MESSAGE_BROADCAST, "Fumikiri-Y88",(string)(((fumi_channel*10000)+(jalur*1000))+(((int)arr_x)*100)+(((int)arr_y)*10)+(int)gatestate),0.0);			
			msgsent=1;
			//Interface.Print("MSGsentClose");
		}
		if(!gatestate and msgsent){
			Router.PostMessage(me.GetId(), Router.MESSAGE_BROADCAST, "Fumikiri-Y88",(string)(((fumi_channel*10000)+(jalur*1000))+(((int)arr_x)*100)+(((int)arr_y)*10)+(int)gatestate),0.0);
			msgsent=0;
			//Interface.Print("MSGsentOpen");

		}
		
		Sleep(0.1f);
	}
	
  }	  
	
  public void Init(void)
  {
    inherited();
	fumikiri_sys();
	
	//AddHandler(me,"Fumikiri-X233","","FumikiriLinkHandler");
	//red = World.FindAsset(GetAsset().LookupKUIDTable("merah"));
  }
  
  /*
  	thread void FumikiriLinkHandler(Message msg) {
		
		string sb = msg.minor;
		int decode = Str.ToInt(sb);
		int temp_m_channel;
		//Interface.Print("encode = " + encode);
		temp_m_channel = decode / 1000;
		if(temp_m_channel==fumi_channel){
			m_channel = temp_m_channel;
			m_arr_x = (bool)Str.ToInt(sb[sb.size()-3,sb.size()-2]);
			m_arr_y = (bool)Str.ToInt(sb[sb.size()-2,sb.size()-1]);
			m_gatestate = (bool)Str.ToInt(sb[sb.size()-1,sb.size()]);					
		}
		
				
		//Interface.Print("m_arr_x = " + Str.ToInt(sb[sb.size()-3,sb.size()-2]));
		//Interface.Print("m_arr_y = " + Str.ToInt(sb[sb.size()-2,sb.size()-1]));
		//Interface.Print("m_gatestate = " + Str.ToInt(sb[sb.size()-1,sb.size()]));		
		
	}
	
	*/
	
	public void SetProperties(Soup sigconfig)
	{
		inherited(sigconfig);
		fumi_channel = sigconfig.GetNamedTagAsInt("fumi_channel");
		jauhdist = sigconfig.GetNamedTagAsInt("jauhdist");
		dekatdist = sigconfig.GetNamedTagAsInt("dekatdist");
		jalur = sigconfig.GetNamedTagAsInt("jalur");
		SpeedVar = sigconfig.GetNamedTagAsBool("spdvar");
		if(jauhdist==0)jauhdist=800;
		if(dekatdist==0)dekatdist=10;
	}
	
	public Soup GetProperties(void)
	{
	Soup sigconfig = inherited();	
	sigconfig.SetNamedTag("fumi_channel",fumi_channel);
	sigconfig.SetNamedTag("jauhdist",jauhdist);
	sigconfig.SetNamedTag("dekatdist",dekatdist);
	sigconfig.SetNamedTag("jalur",jalur);
	sigconfig.SetNamedTag("spdvar",SpeedVar);
	return sigconfig;
	}
	
	public string GetDescriptionHTML(void) {
		string html = inherited();	
		html = html + "<br><font color=#ffffcc size=4><b>JOS V.2.0 : Scanner Settings</a></font><br>";		
		html = html + "<font color=#ffffcc size=3><b> - Channel : <a href=live://property/fumi_channel>" + fumi_channel + "</a></font><br>";
		html = html + "<font color=#ffffcc size=3><b> - No. Track (1-10) : <a href=live://property/jalur>" + jalur + "</a></font><br>";
		html = html + "<font color=#ffffcc size=3><b> - Detection Distance (On Open/Close) : <a href=live://property/jauhdist>" + jauhdist + "</a> / <a href=live://property/dekatdist>" + dekatdist + "</a> m </font><br>";
		html = html + "<font color=#ffffcc size=3><b> - Do you want crossing to still open if nearby train stop : "  + "<a href=live://property/spdvar>";		
		if(SpeedVar){
			html = html + "Yes</a></font><br>";}
		else {
			html = html + "No</a></font><br>";
		}

		html = html + "<br><font color=#ffffcc size=1> If you want to redistribute this assets, please contact me at <i>cecehduakosongtiga@gmail.com</i> <br> @2022 JIRCTrainz All Right Reserved</font><br>";
		return html;	
	}      
    string GetPropertyType(string PID)
    {
		string result = inherited(PID);
		if (PID == "fumi_channel") result = "int";
		if (PID == "jauhdist") result = "int";
		if (PID == "dekatdist") result = "int";
		if (PID == "jalur") result = "int";
		if (PID == "spdvar") result = "link";
		return result;		
	}	
	
	void LinkPropertyValue(string PID) {
		if (PID == "spdvar") 
		{
			SpeedVar=!SpeedVar;
		} 	
	}
	
	string GetPropertyDescription(string PID)
	{
    string result = inherited(PID);
		if (PID == "fumi_channel")
		{
			result = "Enter a Channel Number";
		}
		if (PID == "jauhdist")
		{
			result = "Enter Distance";
		}
		if (PID == "dekatdist")
		{
			result = "Enter Distance";
		}
		if (PID == "jalur")
		{
			result = "Enter jalur";
		}
	return result;
	}

    void SetPropertyValue(string PID, int value)
	{
		if (PID == "fumi_channel") fumi_channel = value;
		else if (PID == "jauhdist") jauhdist = value;
		else if (PID == "dekatdist") dekatdist = value;
		else if (PID == "jalur") jalur = value;
		else inherited(PID, value);
    }	

	
  
};
