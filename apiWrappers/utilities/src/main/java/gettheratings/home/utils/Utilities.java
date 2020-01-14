/*
 * Utilities.java
 *
 * Copyright (c) 2011, InvestQuest. All Rights Reserved.
 *
 * Created on 3 de Out de 2011.
 */

package gettheratings.home.utils;

import java.math.RoundingMode;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Properties;


/**
 * This class provides access to static utility methods that could not
 * be logically grouped into other classes.
 *
 * @author Pedro Oliveira
 * @see Properties
 */
public class Utilities {
	
	/**
	 * The amount decimal format.
	 */
	private static final DecimalFormat AMOUNT_FMT; 
		
	/**
	 * The round decimal format.
	 */
	private static final DecimalFormat ROUND_FMT; 
	
	/**
	 * This block initializes static variables.
	 */
	static {
        DecimalFormatSymbols dfs = new DecimalFormatSymbols();
        dfs.setDecimalSeparator('.');
        ROUND_FMT = new DecimalFormat("####.##");
        ROUND_FMT.setDecimalFormatSymbols(dfs);
        ROUND_FMT.setRoundingMode(RoundingMode.HALF_UP);
		AMOUNT_FMT = new DecimalFormat("###,###.##");
		AMOUNT_FMT.setRoundingMode(RoundingMode.HALF_UP);
	}
    
    /**
     * Suppress the default constructor to enforce noninstanciability.
     */
    private Utilities() { }
    
    /**
     * Returns the given value rounded to the specified number of decimal
     * places.
     * 
     * @param value the number to be rounded. 
     * @param nbrOfDecimalPlaces the desired number of decimal places.
     * @return the value rounded to specified number of decimal places.
     */
    public static double roundDouble(double value, int nbrOfDecimalPlaces) {        
        try {               
            return Double.parseDouble(ROUND_FMT.format(value));
        } catch(Exception e){
            return value;
        }             
    }    
                                         
    /**
     * tryParseDouble
     * @param d
     * @return
     */
	public static Double tryParseDouble(String d) {
		return tryParseDouble(d, null);		
	}
	
	/**
	 * tryParseDouble
	 * @param d
	 * @param def
	 * @return
	 */
	public static Double tryParseDouble(String d, Double def) {
		try {
			return Double.parseDouble(d);
		} catch (Exception e) {
			return def;
		}
	}
	
	public static int tryParseInt(String i) {
		return tryParseInt(i, 0);		
	}
	
	/**
	 * tryParseDouble
	 * @param d
	 * @param def
	 * @return
	 */
	public static int tryParseInt(String i, int def) {
		try {
			return (int) Integer.parseInt(i);
		} catch (Exception e) {
			return def;
		}
	}
    
}
