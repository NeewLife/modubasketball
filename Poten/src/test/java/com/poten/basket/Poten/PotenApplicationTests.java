package com.poten.basket.Poten;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class PotenApplicationTests {

	@Test
	public void getEnc() {
		StandardPBEStringEncryptor standardPBEStringEncryptor = new StandardPBEStringEncryptor();
		standardPBEStringEncryptor.setAlgorithm("PBEWithMD5AndDES");
		standardPBEStringEncryptor.setPassword("password");
		String enc = standardPBEStringEncryptor.encrypt("test1234");
		System.out.println("Encrypted Password is : "+ enc);
	}

}
