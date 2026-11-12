import { MathQuestion } from '../types/math';

export const mathQuestions: MathQuestion[] = [
  // ================= ALGEBRA =================
  {
    id: 'alg-1',
    category: 'algebra',
    topic: 'Linear Equations',
    difficulty: 'easy',
    question: 'Solve for x in the equation: 4x - 7 = 2x + 9',
    formula: 'ax + b = cx + d',
    options: ['x = 8', 'x = 1', 'x = 6', 'x = 16'],
    correctIndex: 0,
    hint: 'Subtract 2x from both sides, then add 7 to both sides.',
    explanation: 'Subtracting 2x from both sides gives 2x - 7 = 9. Adding 7 gives 2x = 16. Dividing by 2 yields x = 8.',
    steps: [
      '4x - 2x = 9 + 7',
      '2x = 16',
      'x = 16 / 2',
      'x = 8'
    ]
  },
  {
    id: 'alg-2',
    category: 'algebra',
    topic: 'Quadratic Equations',
    difficulty: 'medium',
    question: 'What are the roots of the quadratic equation: x² - 5x + 6 = 0?',
    formula: 'ax² + bx + c = 0',
    options: ['x = 2 and x = 3', 'x = -2 and x = -3', 'x = 1 and x = 6', 'x = -1 and x = 6'],
    correctIndex: 0,
    hint: 'Find two numbers that multiply to 6 and add up to -5.',
    explanation: 'Factor the polynomial: (x - 2)(x - 3) = 0. Setting each factor to 0 gives roots x = 2 and x = 3.',
    steps: [
      'Factor x² - 5x + 6 into (x - 2)(x - 3) = 0',
      'Set first factor to zero: x - 2 = 0 ⟹ x = 2',
      'Set second factor to zero: x - 3 = 0 ⟹ x = 3'
    ]
  },
  {
    id: 'alg-3',
    category: 'algebra',
    topic: 'Systems of Equations',
    difficulty: 'medium',
    question: 'Find the value of y in the system of equations:\n2x + y = 11\nx - y = 1',
    formula: 'System of Linear Equations',
    options: ['y = 3', 'y = 4', 'y = 5', 'y = 7'],
    correctIndex: 0,
    hint: 'Add the two equations together to eliminate y, then solve for x.',
    explanation: 'Adding both equations: (2x + y) + (x - y) = 11 + 1 ⟹ 3x = 12 ⟹ x = 4. Substituting x = 4 into x - y = 1 gives 4 - y = 1 ⟹ y = 3.',
    steps: [
      'Add Eq 1 and Eq 2: 3x = 12',
      'x = 4',
      'Substitute x = 4 into x - y = 1: 4 - y = 1',
      'y = 3'
    ]
  },
  {
    id: 'alg-4',
    category: 'algebra',
    topic: 'Exponents & Radicals',
    difficulty: 'hard',
    question: 'Simplify the expression: (2x³y²)³ / (4x⁴y)',
    formula: '(aᵐ)ⁿ = aᵐⁿ',
    options: ['2x⁵y⁵', '2x²y⁵', '8x⁵y⁵', 'x⁵y⁵ / 2'],
    correctIndex: 0,
    hint: 'Cube each term in the numerator first: 2³ = 8, (x³)³ = x⁹, (y²)³ = y⁶.',
    explanation: 'Numerator: 2³ * x⁹ * y⁶ = 8x⁹y⁶. Dividing by denominator 4x⁴y: (8/4) * x^(9-4) * y^(6-1) = 2x⁵y⁵.',
    steps: [
      'Expand numerator: (2)³ * (x³)³ * (y²)³ = 8x⁹y⁶',
      'Divide coefficients: 8 / 4 = 2',
      'Divide x terms: x⁹ / x⁴ = x^(9-4) = x⁵',
      'Divide y terms: y⁶ / y¹ = y^(6-1) = y⁵',
      'Result: 2x⁵y⁵'
    ]
  },
  {
    id: 'alg-5',
    category: 'algebra',
    topic: 'Functions & Inverses',
    difficulty: 'medium',
    question: 'If f(x) = (3x - 5) / 2, what is the inverse function f⁻¹(x)?',
    formula: 'y = f(x) ⟹ x = f⁻¹(y)',
    options: ['f⁻¹(x) = (2x + 5) / 3', 'f⁻¹(x) = (2x - 5) / 3', 'f⁻¹(x) = (3x + 5) / 2', 'f⁻¹(x) = 2 / (3x - 5)'],
    correctIndex: 0,
    hint: 'Replace f(x) with y, swap x and y, and solve for y.',
    explanation: 'Set y = (3x - 5)/2. Swap variables: x = (3y - 5)/2. Multiply by 2: 2x = 3y - 5. Add 5: 2x + 5 = 3y. Divide by 3: y = (2x + 5)/3.',
    steps: [
      'x = (3y - 5) / 2',
      '2x = 3y - 5',
      '3y = 2x + 5',
      'y = (2x + 5) / 3'
    ]
  },
  {
    id: 'alg-6',
    category: 'algebra',
    topic: 'Polynomial Factoring',
    difficulty: 'easy',
    question: 'Factor completely: 9x² - 25',
    formula: 'a² - b² = (a - b)(a + b)',
    options: ['(3x - 5)(3x + 5)', '(3x - 5)²', '(9x - 5)(x + 5)', '(3x + 5)²'],
    correctIndex: 0,
    hint: 'Recognize this as a difference of squares where a = 3x and b = 5.',
    explanation: '9x² = (3x)² and 25 = 5². Using the difference of squares identity a² - b² = (a - b)(a + b), we get (3x - 5)(3x + 5).',
    steps: [
      'Identify a = 3x, b = 5',
      'Apply formula (a - b)(a + b)',
      'Result: (3x - 5)(3x + 5)'
    ]
  },

  // ================= GEOMETRY =================
  {
    id: 'geo-1',
    category: 'geometry',
    topic: 'Pythagorean Theorem',
    difficulty: 'easy',
    question: 'In a right triangle with legs a = 6 and b = 8, what is the length of hypotenuse c?',
    formula: 'a² + b² = c²',
    diagram: 'right-triangle',
    diagramLabels: { a: 6, b: 8, c: '?' },
    options: ['c = 10', 'c = 14', 'c = 12', 'c = √28'],
    correctIndex: 0,
    hint: 'Square both legs, sum them together, and take the square root.',
    explanation: 'By the Pythagorean theorem: c² = 6² + 8² = 36 + 64 = 100. Thus c = √100 = 10.',
    steps: [
      'c² = a² + b²',
      'c² = 6² + 8² = 36 + 64',
      'c² = 100',
      'c = √100 = 10'
    ]
  },
  {
    id: 'geo-2',
    category: 'geometry',
    topic: 'Circle Area & Circumference',
    difficulty: 'easy',
    question: 'A circle has a radius of 7 cm. What is its exact area in terms of π?',
    formula: 'Area = πr²',
    diagram: 'circle-radius',
    diagramLabels: { r: 7 },
    options: ['49π cm²', '14π cm²', '28π cm²', '98π cm²'],
    correctIndex: 0,
    hint: 'The formula for circle area is A = π * r * r.',
    explanation: 'Area = π * (7)² = 49π cm².',
    steps: [
      'A = πr²',
      'A = π * 7²',
      'A = 49π cm²'
    ]
  },
  {
    id: 'geo-3',
    category: 'geometry',
    topic: 'Parallel Lines & Angles',
    difficulty: 'medium',
    question: 'Two parallel lines are intersected by a transversal. If one interior angle is 65°, what is the measure of its consecutive interior angle?',
    formula: 'Consecutive Interior Angles sum to 180°',
    diagram: 'parallel-lines',
    options: ['115°', '65°', '25°', '125°'],
    correctIndex: 0,
    hint: 'Consecutive interior angles on the same side of a transversal are supplementary (add to 180°).',
    explanation: 'Because consecutive interior angles are supplementary: Angle = 180° - 65° = 115°.',
    steps: [
      'Angle₁ + Angle₂ = 180°',
      '65° + Angle₂ = 180°',
      'Angle₂ = 180° - 65° = 115°'
    ]
  },
  {
    id: 'geo-4',
    category: 'geometry',
    topic: '3D Volume & Solids',
    difficulty: 'medium',
    question: 'Find the volume of a right circular cylinder with radius r = 3 cm and height h = 10 cm.',
    formula: 'V = πr²h',
    diagram: 'cylinder-volume',
    diagramLabels: { r: 3, h: 10 },
    options: ['90π cm³', '30π cm³', '60π cm³', '180π cm³'],
    correctIndex: 0,
    hint: 'Calculate the base area (πr²) and multiply by height h.',
    explanation: 'V = π * r² * h = π * 3² * 10 = π * 9 * 10 = 90π cm³.',
    steps: [
      'V = π * r² * h',
      'V = π * (3)² * 10',
      'V = π * 9 * 10 = 90π cm³'
    ]
  },
  {
    id: 'geo-5',
    category: 'geometry',
    topic: 'Coordinate Geometry',
    difficulty: 'hard',
    question: 'What is the distance between the points A(-2, 3) and B(4, 11) in the Cartesian plane?',
    formula: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)',
    diagram: 'coordinate-plane',
    options: ['10', '8', '14', '√68'],
    correctIndex: 0,
    hint: 'Use the distance formula: find Δx = 4 - (-2) and Δy = 11 - 3.',
    explanation: 'Δx = 4 - (-2) = 6. Δy = 11 - 3 = 8. Distance d = √(6² + 8²) = √(36 + 64) = √100 = 10.',
    steps: [
      'x₂ - x₁ = 4 - (-2) = 6',
      'y₂ - y₁ = 11 - 3 = 8',
      'd² = 6² + 8² = 36 + 64 = 100',
      'd = √100 = 10'
    ]
  },
  {
    id: 'geo-6',
    category: 'geometry',
    topic: 'Polygons & Angles',
    difficulty: 'easy',
    question: 'What is the sum of interior angles in a regular hexagon (6-sided polygon)?',
    formula: 'Sum = (n - 2) * 180°',
    options: ['720°', '540°', '900°', '360°'],
    correctIndex: 0,
    hint: 'Plug n = 6 into the formula (n - 2) * 180°.',
    explanation: 'Sum = (6 - 2) * 180° = 4 * 180° = 720°.',
    steps: [
      'Number of sides n = 6',
      'Sum = (6 - 2) * 180°',
      'Sum = 4 * 180° = 720°'
    ]
  },

  // ================= TRIGONOMETRY =================
  {
    id: 'trig-1',
    category: 'trigonometry',
    topic: 'Special Angles',
    difficulty: 'easy',
    question: 'What is the exact value of sin(30°)?',
    formula: 'sin(30°) = opposite / hypotenuse',
    options: ['1/2', '√3/2', '√2/2', '1'],
    correctIndex: 0,
    hint: 'In a 30°-60°-90° standard triangle, the side opposite 30° is half the hypotenuse.',
    explanation: 'By the unit circle and 30-60-90 special right triangle definition, sin(30°) = 1/2.',
    steps: [
      'Standard 30-60-90 triangle sides: 1, √3, 2',
      'sin(30°) = opposite / hypotenuse = 1 / 2'
    ]
  },
  {
    id: 'trig-2',
    category: 'trigonometry',
    topic: 'Pythagorean Identity',
    difficulty: 'easy',
    question: 'If cos(θ) = 4/5 and θ is in Quadrant I, what is sin(θ)?',
    formula: 'sin²(θ) + cos²(θ) = 1',
    options: ['3/5', '1/5', '5/4', '9/25'],
    correctIndex: 0,
    hint: 'Use sin²(θ) = 1 - cos²(θ).',
    explanation: 'sin²(θ) = 1 - (4/5)² = 1 - 16/25 = 9/25. In Quadrant I sine is positive, so sin(θ) = 3/5.',
    steps: [
      'sin²(θ) + (4/5)² = 1',
      'sin²(θ) + 16/25 = 1',
      'sin²(θ) = 9/25',
      'sin(θ) = √(9/25) = 3/5'
    ]
  },
  {
    id: 'trig-3',
    category: 'trigonometry',
    topic: 'Tangent & Cotangent',
    difficulty: 'medium',
    question: 'Evaluate tan(45°) + cos(60°):',
    formula: 'tan(θ) = sin(θ) / cos(θ)',
    options: ['1.5 (or 3/2)', '2', '1', '√3 + 1/2'],
    correctIndex: 0,
    hint: 'tan(45°) = 1 and cos(60°) = 1/2.',
    explanation: 'tan(45°) = 1, and cos(60°) = 0.5. 1 + 0.5 = 1.5 (or 3/2).',
    steps: [
      'tan(45°) = 1',
      'cos(60°) = 1/2 = 0.5',
      '1 + 0.5 = 1.5 = 3/2'
    ]
  },
  {
    id: 'trig-4',
    category: 'trigonometry',
    topic: 'Law of Sines',
    difficulty: 'hard',
    question: 'In △ABC, angle A = 30°, angle B = 45°, and side a = 8. Find side b:',
    formula: 'a / sin(A) = b / sin(B)',
    options: ['8√2', '4√2', '16', '8√3'],
    correctIndex: 0,
    hint: 'Set up 8 / sin(30°) = b / sin(45°).',
    explanation: 'sin(30°) = 1/2, sin(45°) = √2 / 2. b = 8 * sin(45°) / sin(30°) = 8 * (√2/2) / (1/2) = 8√2.',
    steps: [
      '8 / sin(30°) = b / sin(45°)',
      '8 / (1/2) = 16',
      'b = 16 * sin(45°) = 16 * (√2 / 2) = 8√2'
    ]
  },
  {
    id: 'trig-5',
    category: 'trigonometry',
    topic: 'Double Angle Formulas',
    difficulty: 'hard',
    question: 'If sin(x) = 3/5 and cos(x) = 4/5, what is sin(2x)?',
    formula: 'sin(2x) = 2 sin(x) cos(x)',
    options: ['24/25', '12/25', '7/25', '1'],
    correctIndex: 0,
    hint: 'Multiply 2 * (3/5) * (4/5).',
    explanation: 'sin(2x) = 2 * sin(x) * cos(x) = 2 * (3/5) * (4/5) = 24/25.',
    steps: [
      'sin(2x) = 2 * sin(x) * cos(x)',
      'sin(2x) = 2 * (3/5) * (4/5)',
      'sin(2x) = 2 * 12 / 25 = 24/25'
    ]
  },

  // ================= CALCULUS =================
  {
    id: 'calc-1',
    category: 'calculus',
    topic: 'Power Rule Derivatives',
    difficulty: 'easy',
    question: 'Find the first derivative f\'(x) of: f(x) = 5x⁴ - 3x² + 7x - 9',
    formula: 'd/dx (xⁿ) = n·xⁿ⁻¹',
    options: ['20x³ - 6x + 7', '20x⁴ - 6x² + 7', '5x³ - 3x + 7', '20x³ - 6x'],
    correctIndex: 0,
    hint: 'Multiply each coefficient by the power and decrease the exponent by 1.',
    explanation: 'd/dx(5x⁴) = 20x³, d/dx(-3x²) = -6x, d/dx(7x) = 7, d/dx(-9) = 0. Summing gives 20x³ - 6x + 7.',
    steps: [
      'd/dx(5x⁴) = 5 * 4x³ = 20x³',
      'd/dx(-3x²) = -3 * 2x = -6x',
      'd/dx(7x) = 7',
      'd/dx(-9) = 0',
      'f\'(x) = 20x³ - 6x + 7'
    ]
  },
  {
    id: 'calc-2',
    category: 'calculus',
    topic: 'Definite Integrals',
    difficulty: 'medium',
    question: 'Evaluate the definite integral: ∫₀² (3x² + 2x) dx',
    formula: '∫ xⁿ dx = (xⁿ⁺¹)/(n+1)',
    options: ['12', '10', '16', '8'],
    correctIndex: 0,
    hint: 'Find the antiderivative F(x) = x³ + x², then calculate F(2) - F(0).',
    explanation: 'Antiderivative is x³ + x². At x=2: 2³ + 2² = 8 + 4 = 12. At x=0: 0. 12 - 0 = 12.',
    steps: [
      'Antiderivative F(x) = 3(x³/3) + 2(x²/2) = x³ + x²',
      'F(2) = (2)³ + (2)² = 8 + 4 = 12',
      'F(0) = 0',
      'Result = 12 - 0 = 12'
    ]
  },
  {
    id: 'calc-3',
    category: 'calculus',
    topic: 'Limits',
    difficulty: 'medium',
    question: 'Evaluate the limit: lim(x → 3) (x² - 9) / (x - 3)',
    formula: 'lim(x → c) f(x)',
    options: ['6', '3', '0', 'Undefined / Does not exist'],
    correctIndex: 0,
    hint: 'Factor the numerator (x - 3)(x + 3) and cancel the common factor.',
    explanation: '(x² - 9) factors into (x - 3)(x + 3). For x ≠ 3, (x - 3)(x + 3)/(x - 3) = x + 3. As x → 3, 3 + 3 = 6.',
    steps: [
      'Factor numerator: x² - 9 = (x - 3)(x + 3)',
      'Cancel (x - 3): lim(x → 3) (x + 3)',
      'Direct substitution: 3 + 3 = 6'
    ]
  },
  {
    id: 'calc-4',
    category: 'calculus',
    topic: 'Chain Rule',
    difficulty: 'hard',
    question: 'Find the derivative of f(x) = sin(3x²):',
    formula: 'd/dx [f(g(x))] = f\'(g(x)) · g\'(x)',
    options: ['6x cos(3x²)', 'cos(3x²)', '6x sin(3x²)', '3 cos(3x²)'],
    correctIndex: 0,
    hint: 'Outer function is sin(u) and inner function is u = 3x².',
    explanation: 'Derivative of sin(u) is cos(u). Derivative of 3x² is 6x. By chain rule: 6x * cos(3x²).',
    steps: [
      'Let u = 3x², so f(u) = sin(u)',
      'f\'(u) = cos(u) = cos(3x²)',
      'u\' = d/dx(3x²) = 6x',
      'f\'(x) = 6x cos(3x²)'
    ]
  },

  // ================= ARITHMETIC & PRE-ALGEBRA =================
  {
    id: 'arith-1',
    category: 'arithmetic',
    topic: 'Order of Operations (PEMDAS)',
    difficulty: 'easy',
    question: 'Evaluate: 18 - 3 × (4 + 2) ÷ 9',
    formula: 'Parentheses ⟹ Exponents ⟹ Multiplication/Division ⟹ Addition/Subtraction',
    options: ['16', '14', '10', '12'],
    correctIndex: 0,
    hint: 'Compute inside parentheses first: (4 + 2) = 6, then multiplication and division from left to right.',
    explanation: '18 - 3 * 6 / 9 = 18 - 18 / 9 = 18 - 2 = 16.',
    steps: [
      'Parentheses: 4 + 2 = 6',
      'Multiply: 3 * 6 = 18',
      'Divide: 18 / 9 = 2',
      'Subtract: 18 - 2 = 16'
    ]
  },
  {
    id: 'arith-2',
    category: 'arithmetic',
    topic: 'Percentages',
    difficulty: 'easy',
    question: 'An item originally priced at $80 is discounted by 25%. What is the final sale price?',
    formula: 'Price = Original × (1 - Discount Rate)',
    options: ['$60', '$55', '$65', '$20'],
    correctIndex: 0,
    hint: 'Find 25% of 80 (which is 1/4 of 80), then subtract it from 80.',
    explanation: '25% of $80 is 0.25 * 80 = $20. Sale price = 80 - 20 = $60.',
    steps: [
      'Discount amount = 80 * 0.25 = $20',
      'Final price = $80 - $20 = $60'
    ]
  },
  {
    id: 'arith-3',
    category: 'arithmetic',
    topic: 'Fraction Operations',
    difficulty: 'medium',
    question: 'Calculate: (3/4) + (2/5) - (1/10)',
    formula: 'Common denominator needed for addition & subtraction',
    options: ['21/20 (or 1 1/20)', '19/20', '1', '23/20'],
    correctIndex: 0,
    hint: 'Least common denominator of 4, 5, 10 is 20.',
    explanation: '3/4 = 15/20. 2/5 = 8/20. 1/10 = 2/20. (15 + 8 - 2)/20 = 21/20 = 1 1/20.',
    steps: [
      'LCD of 4, 5, 10 is 20',
      'Convert: 15/20 + 8/20 - 2/20',
      'Combine numerators: 15 + 8 - 2 = 21',
      'Result = 21/20'
    ]
  },

  // ================= STATISTICS & PROBABILITY =================
  {
    id: 'stat-1',
    category: 'statistics',
    topic: 'Mean, Median & Mode',
    difficulty: 'easy',
    question: 'Find the median of the data set: 12, 5, 8, 20, 15, 9, 7',
    formula: 'Middle value when ordered in ascending order',
    options: ['9', '8', '11', '12'],
    correctIndex: 0,
    hint: 'Sort the numbers in ascending order: 5, 7, 8, 9, 12, 15, 20. The 4th number is the median.',
    explanation: 'Ordered set: 5, 7, 8, 9, 12, 15, 20. There are 7 elements, so the 4th element is the middle value: 9.',
    steps: [
      'Sort values: [5, 7, 8, 9, 12, 15, 20]',
      'Total items n = 7 (odd)',
      'Median index = (7 + 1) / 2 = 4th value',
      '4th value is 9'
    ]
  },
  {
    id: 'stat-2',
    category: 'statistics',
    topic: 'Basic Probability',
    difficulty: 'medium',
    question: 'A standard 6-sided die is rolled twice. What is the probability that the sum of the two rolls is equal to 7?',
    formula: 'P(Event) = Favorable Outcomes / Total Outcomes',
    options: ['1/6', '1/12', '7/36', '5/36'],
    correctIndex: 0,
    hint: 'Total outcomes = 6 * 6 = 36. Pairs that sum to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).',
    explanation: 'There are 6 pairs that sum to 7 out of 36 possible outcomes. P = 6/36 = 1/6.',
    steps: [
      'Total outcomes = 6 * 6 = 36',
      'Favorable pairs: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 pairs',
      'P = 6 / 36 = 1 / 6'
    ]
  },
  {
    id: 'stat-3',
    category: 'statistics',
    topic: 'Combinations & Permutations',
    difficulty: 'hard',
    question: 'In how many different ways can a committee of 3 students be selected from a group of 8 candidates?',
    formula: 'nCr = n! / (r! · (n - r)!)',
    options: ['56', '336', '24', '112'],
    correctIndex: 0,
    hint: 'Order does not matter in a committee, so use combinations 8C3.',
    explanation: '8C3 = (8 × 7 × 6) / (3 × 2 × 1) = 336 / 6 = 56.',
    steps: [
      'Formula: 8! / (3! * 5!)',
      '= (8 * 7 * 6) / (3 * 2 * 1)',
      '= 336 / 6',
      '= 56'
    ]
  }
];
