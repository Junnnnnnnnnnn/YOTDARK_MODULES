/***** typing your package path ******/
// package com.gochigo.home.module;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class ModuleHomeUtil {
	
	public Date ModuleUtileAdjustDate(String dateTime, int range){
		Calendar cal = Calendar.getInstance();
		try {
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			Date date = df.parse(dateTime);
			
			cal.setTime(date);
			cal.add(Calendar.DATE, range);

		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return cal.getTime();
	}
}
