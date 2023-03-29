# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

#### Part 01 [7 min]
1. Bad code in line `8` to line `15` in file `dpk_old.js` no need to this way of using `if else`, We can use the null safety in JavaScript to reduce number of line of code and make it readable. 
2.  Also on top of that, we can enhance the architect of the code and make it more **readable by split the code to pure functions every function represent a job**.
3. will create a function called `getTrivialPartitionKey` to retrieve the `PartitionKey` if founded in event or create a hash from none. 
4. Bug in line `10 & 19 ` `const data = JSON.stringify(event);`, if the event not defined this line will crash the app, we will replace it with more safety line `const data = JSON.stringify(event || {});`

#### Part 02 [15 min]

1. Repeating the same approach in Part 01, reduce number of `if else` using null safety approach in JavaScript.
2. Removing unnecessary variables to optimize the memory a little bit.
3. Short the logic as possible by removing unnecessary `if else`
4. Line `20` Check if the `typeof of trivialPartitionKey !== 'string'` to enforce converting to string.
5. Return the TRIVIAL_PARTITION_KEY if trivialPartitionKey not available.

#### Part 03 [15 min] Unit Test

1. Add some fixes to make sure the test cases working.
2. writing 2 test cases you can check `dpk.test.js`
