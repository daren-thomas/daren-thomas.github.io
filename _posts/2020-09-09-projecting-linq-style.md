---
layout: post
published: false
title: "Projecting - LINQ-style"
---

This post is an attempt to explain how the `Select` extension method in the .NET Framework works. We'll start with a `for` loop and work our way to a `Select`-clone I'm going to call `Project`.

## Nothing wrong with for loops

Let's start with a simple example: The function `ArrayMultiply` takes an array of integers and returns a new array, with each element multiplied by a given factor:

```csharp
void Main()
{
    int[] input = new int[]  {1, 2, 3};
    int[] output = ArrayMultiply(input, 2);
    Console.WriteLine(output);    
}

int[] ArrayMultiply(int[] input, int factor)
{
    int[] result = new int[input.Length];
    for (int i = 0; i < input.Length; i++)
    {
        result[i] = input[i] * factor;
    }
    return result;
}
```

If you run the above code in [LINQPad](https://www.linqpad.net/) you should see a result like this:

![](C:\Users\darthoma\AppData\Roaming\marktext\images\2020-10-01-09-54-57-image.png)

OK. Cool. What if... what if we wanted to square the results? We could just write a new function `ArraySquare`. Something like this:

```csharp
void Main()
{
    int[] input = new int[]  {1, 2, 3};
    int[] output = ArraySquare(input);
    Console.WriteLine(output);    
}

int[] ArraySquare(int[] input)
{
    int[] result = new int[input.Length];
    for (int i = 0; i < input.Length; i++)
    {
        result[i] = input[i] * input[i];
    }
    return result;
}
```

Not really much changed. Of course, we don't have the `factor` parameter any more. And the line `result[i] = input[i] * factor` is now `result[i] = input[i] * input[i]`. But otherwise the whole _structure_ of the code stays the same. You could say the whole `for` loop is just... boilerplate code for "looping over an input array and creating a new array with a (possibly changing) expression".

## Functions as arguments

Let's make our `Array` function a bit more flexible:

```csharp
void Main()
{
    int[] input = new int[]  {1, 2, 3};
    int[] outputSquared = ArrayDo(input, Square);
    int[] outputDoubled = ArrayDo(input, TimesTwo);
    Console.WriteLine(outputSquared);    
    Console.WriteLine(outputDoubled);
}

int Square(int i)
{
    return i * i;
}

int TimesTwo(int i)
{
    return i * 2;
}

int[] ArrayDo(int[] input, Func<int, int> doStuff)
{
    int[] result = new int[input.Length];
    for (int i = 0; i < input.Length; i++)
    {
        result[i] = doStuff(i);
    }
    return result;
}
```

So now we have a function `ArrayDo` that takes _another_ function `doStuff` as it's argument. Notice how it's declared: `Func<int, int>`. That's weird. Funky even. What does it even mean? Well... it means, that we're expecting a function that takes an `int` and returns an `int`.

Our two functions `Square` and `TimesTwo` do just that.

You can read all about [generics on msdn]([Generics - C# Programming Guide | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/generics/)). We'll explore them further in the next chapter. But first, let's take a deep breath and consider what just happened.

We've just made our _boilerplate_ method of iterating over an input array and constructing an output array _independant_ of _what_ we're doing to the array. `doStuff` can be anything. Well. As long as it returns an `int`...

## Generics

Let's say... let's say we wanted `doStuff` to return an array of `char` instead. A friend just wrote me a letter and it's a bunch of numbers. And I happen to know that each number is the ascii code for a letter.

Since we can't use ArrayDo (we're expecting a `char[]` result), let's just go back to our original loop:

```csharp
void Main()
{
    int[] input = new int[]  {104, 105};
    char[] output = new char[input.Length];

    for (int i = 0; i < input.Length; i++)
    {
        output[i] = (char) input[i];
    }
    Console.WriteLine(output);
}
```

It's kind of annoying, that we have to fall back to typing out the whole loop again, just to read my friend's message. Btw: You ran the code, right? What was the message?

What if... What if we could rewrite `ArrayDo`, so that it could work on different _types_ of arrays? We talked about generics before. Briefly. I'm not going to go into the whole mechanics. Let's just say we could assume `ArrayDo` works on two types, an input type `TIn` and an output type `TOut`. The names don't _have_ to start with a T. But it's common practice to do so.

```csharp
void Main()
{
    int[] input = new int[]  {104, 105};
    char[] output = new char[input.Length];

    output = ArrayDo(input, Convert);
    Console.WriteLine(output);
}

char Convert(int i)
{
    return (char) i;
}

TOut[] ArrayDo<TIn, TOut>(TIn[] input, Func<TIn, TOut> doStuff)
{
    TOut[] output = new TOut[input.Length];
    for (int i = 0; i < input.Length; i++)
    {
        output[i] = doStuff(input[i]);
    }
    return output;
}
```

Think of `TIn` and `TOut` as parameters to the _compiler_. The compiler will view your generic function as a _template_ for generating a concrete function. In this case, it would create something like `char[] ArrayDo_int_char(int[] input, Func<int, char> doStuff)`. Actually, the function will have a slightly different name and I'm a bit too lazy to go and look it up (by disassembling the output). But the _idea_ is the same: A new function with the types _baked in_.



You know what still bugs me? Creating a separate function every time I want to do stuff. I'm talking about `Square`, `TimesTwo`, `Convert` and all the other such functions that I'll be using with `ArrayDo`. Wouldn't it be nice to have a shorthand for that?

## Lambda expressions

Well. Turns out, this is something a lot of people wanted and [C# now has lambda expressions]([Lambda expressions - C# reference | Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/lambda-expressions)). It's had it for quite a while. _Now_ in this context is just me being an old fart.

Yep. That's another msdn reference. For the gory details. The short version: Short ad-hoc functions can be written as expressions inside another function. So we end up with code like this:

```csharp
void Main()
{
    int[] input = new int[]  {104, 105};
    char[] output = new char[input.Length];
	
	output = ArrayDo(input, (i) => (char) i);
	Console.WriteLine(output);
}

TOut[] ArrayDo<TIn, TOut>(TIn[] input, Func<TIn, TOut> doStuff)
{
	TOut[] output = new TOut[input.Length];
	for (int i = 0; i < input.Length; i++)
	{
		output[i] = doStuff(input[i]);
	}
	return output;
}
```

See? We replaces `Convert` with the expression `(i) => (char) i`. The parenthesis at the beginning of the expression is the argument list for our ad-hoc function definition. Followed by `=>`. Followed by an expression, whose result is the return value of the function: `(char) i`.

`Square` could be written as `(i) => i * i` and `TimesTwo` would be written as `(i) => i * 2`.

The function doesn't _need_ a name, so lambdas are anonymous. You _could_ assign it to a variable: `Func<int, char> doStuff = (i) => (char) i;`

Also note that we don't need to specify types here - the compiler is going to figure that out for us, just as it does with `var` etc. I'm sure it'll complain if it doesn't have enough information to do that - I've just never actually run into that situation... Maybe some really smart guy was able to figure out that that _can't_ happen. Ever.
