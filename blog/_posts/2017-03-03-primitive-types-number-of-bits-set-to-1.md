---
layout: post
title:  "Primitive Types: Number of Bits Set to 1"
date:   2017-03-03 21:24:18 -0600
categories: java
---
My friend and I both graduated from Illinois State University with degrees in computer science and felt rusty in solving programming problems. We decided to take a look at [Elements of Programming Interviews in Java](https://www.amazon.com/Elements-Programming-Interviews-Java-Insiders/dp/1517435803/ref=pd_cp_14_2?_encoding=UTF8&pd_rd_i=1517435803&pd_rd_r=7BAKMD82Y95AW1B9KE9P&pd_rd_w=Zppoz&pd_rd_wg=2cL9g&psc=1&refRID=7BAKMD82Y95AW1B9KE9P) and started off reviewing the first provided sample problem listed in the Primitive Types section. I’ve decided it’d be helpful to reflect on problems I solve to better internalize my knowledge so here’s my rough explanation. The hope is that my friends with no background in computers but an interest in learning could understand how to solve the following problem by walking through each step.

```java
Write a program to count the number of bits that are set to 1 in an integer.

public static short countBits(int x) {
  short numBits = 0;
  while (x != 0) {
    numBits += (x & 1);
    x >>>= 1;
  }
  return numBits;
}
```

## What is a bit?
To begin with, the word bit is a portmanteau from binary and digit. A bit is the smallest unit of data in a computer and has a single binary value of either `0` or `1`. It may also help to understand how to count in binary to solve this problem.

## How to count in binary.
Say you have the integer/decimal system (base ten) value `8`. The binary system equivalent (base 2) would be `1000` (one-zero-zero-zero, not one thousand). This is how:

```
...0   0   0   0   1  0  0  0 
   64  32  24  16  8  4  2  1
```
Counting right to left, each bottom digit corresponds to a value. For example, if there is a 1 in that bottom digit, then you multiply `1` to that corresponding top digit/value and continue doing so, right-to-left, adding up the resulting values. If there is a `0`, you do nothing, since `0` times some value will always be `0`. For example, in our case to verify that `1000` is `8`:

```
  0x1 = 0
+ 0x2 = 0
+ 0x4 = 0
+ 1x8 = 8
---------
TOTAL:  8
```
If the binary value we are given is `1110`, the corresponding decimal value would be 14:
```
...0   0   0   0   1  1  1  0 
   64  32  24  16  8  4  2  1
```

```
  0x1 = 0
+ 1x2 = 2
+ 1x4 = 4
+ 1x8 = 8
---------
TOTAL: 14
```

## What is two’s complement?
In this problem, since we’re working with the Java language that is using primitive types that are two’s complement, it is important to know how this will affect our choice of operator (`>>>`) and answer. Two’s complement allows a computer to store integer values and make it simpler for the computer to do math but this is done in binary. Signed integer values can be either positive or negative and two’s complement gives us a way to represent that. Consider the following nibbles (a nibble is 4 bits which is half a byte):

```
0100 - four
0011 - three
0010 - two
0001 - one
0000 - zero
1111 - negative one
1110 - negative two
1101 - negative three
1011 - negative four
```

Basically, a value is considered positive when the most significant bit (left most bit) is `0` and a value is considered negative when the most significant bit is `1`. The complement portion is where negative values are flipped in contrast to their positive value counterparts. The best explanation I’ve read for two’s complement can be read in more depth on this [Stack Overflow answer](http://stackoverflow.com/questions/1049722/what-is-2s-complement).

## Why use a short?
Java has primitive data types each with the ability to store specific values. A short is a 16-bit two’s complement integer, capable of storing values from -2-15 to 215 -1. This translates to a minimum value of -32,768 and a maximum value of 32,767 (inclusive). 

Since we’re working with integers, which in Java are each 4 bytes and approximately 32 bits (with 8 bits per 1 byte, 4 bytes x 8 bits = 32), at most if an integer had all 1s in its binary counterpart, you’d be left with 32 bits set to 1.

In binary, the largest possible integer value in Java (2,147,483,647) is represented with 32 bits, all 1s as follows:
`0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1`

The total number of bits equal to `1` for this value would give us `numBits = 31`, since it’s two’s complement, the left most bit `0` is the “most significant bit” meaning it tells us the sign of the integer, where the leading `0` represents a positive value (2,147,483,647).

The smallest possible integer value in Java (-2,147,483,648) is represented with 32 bits as follows:
`1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0`

The total number of bits equal to `1` for this value would give us `numBits = 1`, since it’s 2s complement, the left most bit is the “significant bit” meaning it tells us the sign of the integer, where `1` represents a negative value (-2,147,483,648).

So, since in the worst case scenario (smallest int value, `numBits = 1` and largest int value, `numBits = 31`) it would seem to me you’d be able to use a byte to store potential values 1 through 31 instead of a short if you wanted. Replacing it in our program using a “byte” primitive type, and indeed, it works (-128 to 127 inclusive).

## int x
Every integer (whole number) value has a counterpart binary number. Binary numbers are made up of 1s and 0s. As an integer number is passed into this function, we create a variable called numBits to store the total count for the number of bits that are 1s in the given integer.

## x & 1
The symbol `&` is the bitwise `AND` operator. To begin with, it helps to be familiar with the idea that `0` is false, and `1` is true in a truth table. We can use a truth table to help us determine the answer for `x & 1`.

```
For example:
a = 0011 1100
b = 0000 1101
```

| a |  b | equation |  output  |
|:-:|:--:|:--------:|:---------|
| 0 |  0 | 0 & 0 =  | 1 (true) |
| 0 |  0 | 0 & 0 =  | 1 (true) |
| 1 |  0 | 1 & 0 =  | 0 (false)|
| 1 |  0 | 1 & 0 =  | 0 (false)|
| 1 |  1 | 1 & 1 =  | 1 (true) |
| 1 |  1 | 1 & 1 =  | 1 (true) |
| 0 |  0 | 0 & 0 =  | 1 (true) |
| 0 |  1 | 0 & 1 =  | 0 (false)|

`Answer: a & b = 1100 1110`

In the case of this sample problem, we are checking `x & 1`. The integer value `1` will always be `0001` in binary. No matter the integer value passed in for `x`, we are always checking to compare the least significant bit of each integer (the right most bit) to the binary value `0001`.

```
For example, 8 & 1 [translates to 1000 & 0001]:
8 = 1000
1 = 0001
0 & 1 = FALSE (0)
```

Since there are no matching 1s, the bitwise operation returns false (`0`) and we do not count an additional `1` existing in the given integer. Instead, we move on to the next line of code. However, if we were given the integer value `9` which is represented in binary as `1001`, the the operation would return true and we would add another count to numBits.

```
9 = 1001
1 = 0001
1 & 1 = TRUE (1)
```

## x &gt;&gt;&gt;= 1;
Continuing on to the next line of code (`x >>>= 1;`), the zero fill right shift operator (`>>>`) will go ahead and shave the least significant bit (right most bit) by 1 from the integer’s binary equivalent and append a `0` to the left most space. In this case, the code asks us to perform the following operation `x >>>= 1`. We will first need to look at this as simply `x >>> 1`. 

For example if we have the value 8 and the binary equivalent `1000`:
```
    x >>> 1 (shift by 1 bit, if it were x >>> 2, we would shift by 2 bits)
 1000 >>> 1
01000 >>> 1
Result = 0100
```
If we were to take the resulting value of 0100 and use the same operator to shift by 1 at least three more times, we would get the following result:

```
1.         0100 >>> 1
   Result: 0010

2.         0010 >>> 1
   Result: 0001

3.               0001 >>> 1
   Final Result: 0000
```

Finally, to account for the equal sign in `>>>=`, simply think of it as an assignment after completing the operation. The resulting value from the operation is now stored in `x`.
```
1000 >>>= 1
x = 0100
```

While the value for `x` is not equal to zero, continue the loop. Once `x` is equal to `0` (we’ve shifted and checked all our bits until everything has been replaced with a `0`), break out of the while loop. At this point, we would be done counting the number of bits equal to `1`.

## Why use &gt;&gt;&gt; over &gt;&gt;?
`>>` right bit shift operator appends the signed most significant bit. The program would work normally with positive values, but for negative values, for every shift it would append a `1` instead of a `0`. This means that as it appends `1`, it will repeat doing that since the condition of `x = 0` will never be met, and will eventually fill all 32 integer bits with 1.

`>>>` will not. `>>>` will shift and append / fill the shifted spot with `0` whether it is a positive (`0`) or negative (`1`) value.