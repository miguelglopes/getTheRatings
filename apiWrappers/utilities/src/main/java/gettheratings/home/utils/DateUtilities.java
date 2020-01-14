/*
 * DateUtilities.java
 *
 * Copyright (c) 2012, InvestQuest. All Rights Reserved.
 *
 * Created on 31 de Jul de 2012.
 */

package gettheratings.home.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;


/**
 * This class provides access to static utility methods, involving {@code Date} 
 * classes, that could not be logically grouped into other classes.
 *
 * @author Pedro Oliveira
 * @see Date
 */
public class DateUtilities {

	/**
	 * The time date format containing only the time information (HH:mm:ss).
	 */
	public static final DateFormat TIME_FORMAT;
	
	/**
	 * The date and time format containing all information about a date until 
	 * the minutes field (yyyy-MM-dd HH:mm). 
	 */	
	public static final DateFormat TIME_MIN_FMT;		

	/**
	 * The date format containing only the date information (dd-MM-yyyy).
	 */
	public static final DateFormat DATE_FORMAT;
	
	/**
	 * The complete date and time format containing all information about a 
	 * date (yyyy-MM-dd HH:mm:ss). 
	 */	
	public static final DateFormat COMPLETE_FORMAT;	
	
	/**
	 * The random generator used in this class.
	 */
	private static final Random RAND_GEN;
	
	/**
	 * This block initializes static final variables.
	 */
	static {
		TIME_FORMAT = new SimpleDateFormat("HH:mm:ss");
		DATE_FORMAT = new SimpleDateFormat("dd-MM-yyyy");
		COMPLETE_FORMAT = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		TIME_MIN_FMT = new SimpleDateFormat("dd-MM-yyyy HH:mm");
		RAND_GEN = new Random();
	}
	
	/**
	 * This enum represents the time options available (secs, mins, hours, days
	 * or years).
	 */
    public enum TimeOptions {    	    	
        SECONDS,
        MINUTES,
        HOURS,
        DAYS,
        YEARS
    }  	
	
    /**
     * Suppress the default constructor to enforce noninstanciability.
     */
    private DateUtilities() { }    
	
    /**
     * Returns <tt>true</tt> if the first date is before the second and 
     * <tt>false</tt> otherwise.
     * 
     * @param d1 the first date object to be compared.
     * @param d2 the second date object to be compared.
     * @return <tt>true</tt> if the first date is before the second and 
     * <tt>false</tt> otherwise.
     */
    public static boolean isDateBefore(Date d1, Date d2) {        
        Calendar c1 = Calendar.getInstance();
        c1.setTime(d1);
        Calendar c2 = Calendar.getInstance();
        c2.setTime(d2);        
        return c1.compareTo(c2) < 0;              
    }    
    
    /**
     * Truncates the given date, by clearing all hour, minutes, seconds and 
     * milliseconds information.
     * 
     * @param d the date to be truncated.
     * @return the truncated date.
     */
    public static Date truncate(Date d) {
	    Calendar calendar = Calendar.getInstance();
	    calendar.setTime(d);
	    calendar.set(Calendar.HOUR_OF_DAY, 0);
	    calendar.clear(Calendar.MINUTE);
	    calendar.clear(Calendar.SECOND);
	    calendar.clear(Calendar.MILLISECOND);
	    Date truncatedDate = calendar.getTime();
	    return truncatedDate;
    }
    
    /**
     * Returns <tt>true</tt> if the specified date is today.
     * 
     * @param d the date to be evaluated.
     * @return <tt>true</tt> if the specified date is today.
     */
    public static boolean isDateToday(Date d) {
    	String dateStr = date2String(d, DATE_FORMAT);
    	Date today = Calendar.getInstance().getTime(); 
    	String todayStr = date2String(today, DATE_FORMAT);
    	return dateStr.equals(todayStr);
    }
    
    /**
     * Returns a double value with the time elapsed between the start and 
     * final dates, using the options argument as a time frame indication.
     * 
     * @param finalDt the final date object to use in the calculation.
     * @param startDt the start date object to use in the calculation.
     * @param option the {@code TimeOptions} object indicating the multiplier
     * to use in calculations.
     * @return a value representing the time elapsed between the start and 
     * final dates, using the time frame given by the options argument.
     */
    public static double getTimeBetweenDates(Date finalDt, Date startDt, 
    		TimeOptions option) {        
        long numMillis = finalDt.getTime() - startDt.getTime();        
        double multiplier = 1;
                
        switch(option) {
        	case YEARS : 
        		multiplier = 365;
        	case DAYS : 
        		multiplier *= 24;
        	case HOURS : 
        		multiplier *= 60;
        	case MINUTES : 
        		multiplier *= 60;
            case SECONDS : 
            	multiplier *= 1;                        
        }
        return (Double.valueOf(numMillis) / (1000 * multiplier));                
    }    
    
    /**
     * Converts a date in a format of a string to a {@code Date} object. The
     * time string should only contain the time information.
     * 
     * The date information regarding the year, month and day will be set with
     * the current date.
     * 
     * @param time the {@code String} representation of a date to be parsed 
     * into a {@code Date} object.
     * @return the parsed {@code Date} object using the given time string value
     * as argument.
     * @throws ParseException if the time string given has a format that is not
     * supported by this method.
     */    
    public static Date string2date(String date) throws ParseException {    	
    	return string2date(date, DATE_FORMAT);
    }    
    
    /**
     * Converts a date in a format of a string to a {@code Date} object. The
     * time string should only contain the time information.
     * 
     * The date information regarding the year, month and day will be set with
     * the current date.
     * 
     * @param time the {@code String} representation of a date to be parsed 
     * into a {@code Date} object.
     * @param df the date format to use when parsing the date string.
     * @return the parsed {@code Date} object using the given time string value
     * as argument.
     * @throws ParseException if the time string given has a format that is not
     * supported by this method.
     */    
    public static Date string2date(String date, DateFormat df) 
    		throws ParseException {    	
    	return (date == null ? null : df.parse(date));
    }       
    
    /**
     * Calculate a limit date using the limit value to subtract to current 
     * date. The limit value is subtracted to the field given as argument.
     * 
     * @param timeLimit the value to subtract to current date.
     * @param field the field of the date to be subtracted.
     * @return the current date subtracted of the argument timeLimit value.
     */
    public static Date calcLimitDate(int timeLimit, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(field, -timeLimit);
        Date limitDate = calendar.getTime();
        return limitDate;
    }          
    
    /**
     * Converts between a {@code Date} object to a {@code String} time 
     * representation. Only the time information will be extracted during the
     * formatting process.
     * 
     * @param date the date to be formatted.
     * @return a {@code String} representation of the time information of the 
     * given date.
     */
    public static String date2String(Date date) {
        return (date == null ? "" : TIME_FORMAT.format(date));
    }
    
    /**
     * Converts between a {@code Date} object to a {@code String} time 
     * representation. The string will be created using the desired date 
     * format. 
     * 
     * @param date the date to be formatted.
     * @param df the format used parsing the complete date expression.
     * @return a {@code String} representation of the time information of the 
     * given date.
     */
    public static String date2String(Date date, DateFormat df) {
        return (date == null ? "" : df.format(date));
    }    
    
    /**
     * Returns the time elapse in miliseconds between the start date specified
     * and the current date.
     * 
     * @param start the date to use as start date in the calculation.
     * @return the number of miliseconds between the current date and the 
     * specified date.
     */
    public static long getMiliseconds(Date start) {
    	Date now = new Date();
    	return now.getTime() - start.getTime();
    }
    
    /**
     * Returns the time elapse in miliseconds between the start time in 
     * milisenconds specified and the current date.
     * 
     * @param start the start time in miliseconds to use as start time in the
     * calculation.
     * @return the number of miliseconds between the current time and the 
     * specified date.
     */
    public static long getMiliseconds(long start) {
    	return (System.nanoTime() - start) / 1000000;
    }    
    
    /**
     * Returns the time elapsed in minutes between the start date specified and
     * the current date.
     * 
     * @param start the date to use as start date in the calculation.
     * @return the number of minutes between the current date and the 
     * specified date.
     */
    public static int getMinutes(Date start) {
    	long ms = getMiliseconds(start);
    	return ((int) ms / (1000 * 60)); 
    }    
    
    /**
     * This method merges the date information for the first argument, with 
     * the time information of the second argument. Returns <tt>null</tt> if 
     * any of the arguments is <tt>null</tt>.
     * 
     * @param date the date element which will set the date information of the 
     * merged date.
     * @param time the time element which will set the time information of the 
     * merged date.
     * @throws ParseException thrown if an error is raised while parsing the 
     * merged date. 
     * @return a merged date using the date and time information of the given 
     * arguments, respectively.
     */
    public static Date merge(Date date, Date time) throws ParseException {
    	if (date == null || time == null) {
    		return null;
    	}
    	String dateStr = date2String(date, DATE_FORMAT);
    	String timeStr = date2String(time, TIME_FORMAT);
    	String mergedStr = dateStr + " " + timeStr;
    	return COMPLETE_FORMAT.parse(mergedStr);
    }
    
    /**
     * Sets the date given as argument with the seconds field with a random
     * number. 
     * 
     * @param date the date which will have its seconds field modified.
     */
    public static Date setRandomSecs(Date date) {
    	if (date == null) {
    		throw new NullPointerException();
    	}
    	Calendar c = Calendar.getInstance();
    	c.setTime(date);
    	c.set(Calendar.SECOND, RAND_GEN.nextInt(60));
    	return c.getTime();
    }
    
    /**
     * Returns the current date truncated in the hours and minutes.
     * 
     * @return the current date truncated in the hours and minutes.
     */
    public static Date getCurrentDate() {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		return c.getTime();    	
    }
    
    /**
     * Adds the specified number of week days to the time in the given calendar
     * instance.
     * 
     * @param c the calendar instance to which the days will be added.
     * @param weekDays the number of week days to add to the date.
     */
    public static void addWeekDays(Calendar c, int weekDays) {
    	if (c == null) {
    		throw new NullPointerException();
    	}		
		for (int i = 1; i <= weekDays; i++) {
			c.add(Calendar.DAY_OF_WEEK, 1);
			int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
			if (dayOfWeek == Calendar.SATURDAY || 
					dayOfWeek == Calendar.SUNDAY) {
				i--;
			}
		}
    }
	
}
