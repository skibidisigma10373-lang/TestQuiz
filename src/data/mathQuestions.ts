import { MathQuestion } from '../types/math';

export const mathQuestions: MathQuestion[] = [
  // ================= ALGEBRA (ADVANCED & HONORS) =================
  {
    id: 'alg-1',
    category: 'algebra',
    topic: 'Logarithmic Equations & Extraneous Roots',
    difficulty: 'hard',
    question: 'Solve for all real values of x in the equation:\nlog₂(x) + log₂(x - 2) = 3',
    formula: 'log_b(m) + log_b(n) = log_b(mn), with m, n > 0',
    options: [
      'x = 4 and x = -2',
      'x = 2 and x = 3',
      'x = 4 only (x = -2 is extraneous)',
      'x = 8 only'
    ],
    correctIndex: 2, // Option C
    hint: 'Combine logarithms into log₂(x(x - 2)) = 3, solve the quadratic, and check domain constraints (x > 2).',
    explanation: 'By log rules, log₂(x² - 2x) = 3 ⟹ x² - 2x = 2³ = 8. Rearranging gives x² - 2x - 8 = 0 ⟹ (x - 4)(x + 2) = 0. While x = 4 and x = -2 are algebraic solutions, logarithms require positive arguments (x > 0 and x - 2 > 0 ⟹ x > 2). Thus x = -2 is extraneous, leaving only x = 4.',
    steps: [
      'log₂(x(x - 2)) = 3',
      'x(x - 2) = 2³ = 8',
      'x² - 2x - 8 = 0',
      '(x - 4)(x + 2) = 0 ⟹ x = 4 or x = -2',
      'Domain verification: x > 2, hence x = -2 is rejected. Solution: x = 4'
    ]
  },
  {
    id: 'alg-2',
    category: 'algebra',
    topic: 'Rational Inequalities & Sign Charts',
    difficulty: 'hard',
    question: 'Find the solution set for the rational inequality:\n(2x - 5) / (x + 1) ≤ 1',
    formula: 'Move all terms to one side: f(x) ≤ 0 and find critical points',
    options: [
      '-1 ≤ x ≤ 6',
      '-1 < x ≤ 6 (or (-1, 6])',
      'x ≤ 6',
      'x < -1 or x ≥ 6'
    ],
    correctIndex: 1, // Option B
    hint: 'Do not multiply both sides by (x + 1) directly because its sign depends on x. Subtract 1 instead.',
    explanation: 'Subtract 1: (2x - 5)/(x + 1) - (x + 1)/(x + 1) ≤ 0 ⟹ (x - 6)/(x + 1) ≤ 0. Critical points are x = -1 (vertical asymptote, denominator cannot equal zero) and x = 6 (numerator zero). Testing intervals shows the ratio is negative strictly when -1 < x ≤ 6.',
    steps: [
      '(2x - 5)/(x + 1) - 1 ≤ 0',
      '[(2x - 5) - (x + 1)] / (x + 1) ≤ 0',
      '(x - 6) / (x + 1) ≤ 0',
      'Critical values: x = -1 (open), x = 6 (closed)',
      'Sign analysis on (-∞, -1), (-1, 6], [6, ∞) yields: (-1, 6]'
    ]
  },
  {
    id: 'alg-3',
    category: 'algebra',
    topic: 'Nonlinear Systems of Equations',
    difficulty: 'hard',
    question: 'How many distinct real solution pairs (x, y) satisfy the system:\nx² + y² = 25\ny - x² = -5',
    formula: 'x² + y² = r² and parabolic substitution',
    options: [
      'Exactly 3 real solutions',
      'Exactly 2 real solutions',
      'Exactly 4 real solutions',
      'No real solutions'
    ],
    correctIndex: 0, // Option A
    hint: 'Express x² in terms of y from the second equation (x² = y + 5) and substitute into the circle equation.',
    explanation: 'From Eq 2: x² = y + 5. Substituting into Eq 1: (y + 5) + y² = 25 ⟹ y² + y - 20 = 0 ⟹ (y + 5)(y - 4) = 0. If y = -5: x² = 0 ⟹ x = 0 (pair (0, -5)). If y = 4: x² = 9 ⟹ x = ±3 (pairs (3, 4) and (-3, 4)). Total = 3 distinct real solutions.',
    steps: [
      'Substitute x² = y + 5 into x² + y² = 25',
      'y² + y - 20 = 0',
      '(y + 5)(y - 4) = 0 ⟹ y = -5 or y = 4',
      'For y = -5: x² = 0 ⟹ (0, -5)',
      'For y = 4: x² = 9 ⟹ (3, 4) and (-3, 4)',
      'Result: 3 distinct real pairs'
    ]
  },
  {
    id: 'alg-4',
    category: 'algebra',
    topic: 'Polynomial Roots & Complex Conjugates',
    difficulty: 'hard',
    question: 'The cubic polynomial P(x) = x³ - 4x² + kx - 10 has real coefficients and a complex root x = 1 + 2i. What is the value of the constant k?',
    formula: 'Conjugate Root Theorem & Vieta\'s Formulas',
    options: [
      'k = 7',
      'k = 13',
      'k = 9',
      'k = -9'
    ],
    correctIndex: 2, // Option C
    hint: 'Because coefficients are real, the complex conjugate 1 - 2i must also be a root. Use Vieta\'s formula for the sum and product of roots.',
    explanation: 'Since coefficients are real, roots are r₁ = 1 + 2i, r₂ = 1 - 2i, and a real root r₃. By Vieta\'s sum of roots: r₁ + r₂ + r₃ = 2 + r₃ = 4 ⟹ r₃ = 2. Check product: (1+2i)(1-2i)(2) = 5(2) = 10 (matches -(-10)). The coefficient k is the sum of pairwise products: r₁r₂ + r₂r₃ + r₁r₃ = 5 + 2(1-2i) + 2(1+2i) = 5 + 4 = 9.',
    steps: [
      'Conjugate root: r₂ = 1 - 2i',
      'Sum of roots r₁ + r₂ + r₃ = 4 ⟹ 2 + r₃ = 4 ⟹ r₃ = 2',
      'Product of roots: 5 * 2 = 10',
      'Pairwise products k = 5 + 2(1-2i) + 2(1+2i) = 5 + 4 = 9'
    ]
  },
  {
    id: 'alg-5',
    category: 'algebra',
    topic: 'Nested Radicals De-nesting',
    difficulty: 'medium',
    question: 'Simplify the nested radical expression:\n√(7 + 4√3)',
    formula: '√(a + b ± 2√(ab)) = √a ± √b',
    options: [
      '2 + √3',
      '1 + 2√3',
      '3 + √2',
      '4 + √3'
    ],
    correctIndex: 0, // Option A
    hint: 'Rewrite 4√3 as 2√(12), and find two numbers that sum to 7 and multiply to 12.',
    explanation: '√(7 + 4√3) = √(7 + 2√12). We look for two integers u and v such that u + v = 7 and uv = 12. These are 4 and 3. Thus √(7 + 2√12) = √4 + √3 = 2 + √3. Check: (2 + √3)² = 4 + 4√3 + 3 = 7 + 4√3.',
    steps: [
      'Write in standard form: √(7 + 2√12)',
      'Find factors: u + v = 7, uv = 12 ⟹ u = 4, v = 3',
      'De-nest: √4 + √3 = 2 + √3'
    ]
  },
  {
    id: 'alg-6',
    category: 'algebra',
    topic: 'Exponential Equations with Change of Base',
    difficulty: 'hard',
    question: 'Solve for x in the equation:\n4^(x + 1) - 9 · 2^x + 2 = 0',
    formula: 'Let u = 2^x to convert into a quadratic in u',
    options: [
      'x = 1 and x = 2',
      'x = 0 and x = 2',
      'x = 2 only',
      'x = 1 and x = -2'
    ],
    correctIndex: 3, // Option D
    hint: 'Notice 4^(x+1) = 4 · (2^x)². Substitute u = 2^x to form 4u² - 9u + 2 = 0.',
    explanation: 'Let u = 2^x (u > 0). The equation becomes 4u² - 9u + 2 = 0. Factoring gives (4u - 1)(u - 2) = 0 ⟹ u = 1/4 or u = 2. For u = 2: 2^x = 2 ⟹ x = 1. For u = 1/4: 2^x = 2⁻² ⟹ x = -2. Solutions: x = 1 and x = -2.',
    steps: [
      'Rewrite: 4 · (2^x)² - 9 · (2^x) + 2 = 0',
      'Let u = 2^x: 4u² - 9u + 2 = 0',
      'Factor: (4u - 1)(u - 2) = 0',
      'u = 2 ⟹ 2^x = 2¹ ⟹ x = 1',
      'u = 1/4 ⟹ 2^x = 2⁻² ⟹ x = -2'
    ]
  },

  // ================= GEOMETRY (RIGOROUS & THEORETICAL) =================
  {
    id: 'geo-1',
    category: 'geometry',
    topic: 'Power of a Point (Tangent-Secant Theorem)',
    difficulty: 'hard',
    question: 'From an external point P, a tangent line touches a circle at point T with length PT = 12 cm. A secant line from P passes through the circle, intersecting it first at point A and then at point B. If PA = 8 cm, what is the length of chord AB?',
    formula: 'PT² = PA · PB',
    options: [
      'AB = 18 cm',
      'AB = 10 cm',
      'AB = 14 cm',
      'AB = 9 cm'
    ],
    correctIndex: 1, // Option B
    hint: 'Apply the Tangent-Secant theorem: PT² = PA · PB to find total secant length PB, then chord AB = PB - PA.',
    explanation: 'By the Tangent-Secant Theorem: PT² = PA · PB ⟹ 12² = 8 · PB ⟹ 144 = 8 · PB ⟹ PB = 18 cm. The chord AB is the segment inside the circle: AB = PB - PA = 18 - 8 = 10 cm.',
    steps: [
      'PT² = PA · PB',
      '12² = 8 · PB ⟹ 144 = 8 · PB',
      'PB = 144 / 8 = 18 cm',
      'Chord AB = PB - PA = 18 - 8 = 10 cm'
    ]
  },
  {
    id: 'geo-2',
    category: 'geometry',
    topic: 'Point-to-Line Perpendicular Distance',
    difficulty: 'medium',
    question: 'What is the perpendicular distance d from point P(3, -2) to the linear boundary 4x - 3y + 7 = 0 in the Cartesian coordinate plane?',
    formula: 'd = |Ax₀ + By₀ + C| / √(A² + B²)',
    diagram: 'coordinate-plane',
    options: [
      'd = 5',
      'd = 25',
      'd = 3.5',
      'd = √29'
    ],
    correctIndex: 0, // Option A
    hint: 'Substitute A = 4, B = -3, C = 7, x₀ = 3, y₀ = -2 into the distance formula.',
    explanation: 'd = |4(3) - 3(-2) + 7| / √(4² + (-3)²) = |12 + 6 + 7| / √(16 + 9) = |25| / √25 = 25 / 5 = 5.',
    steps: [
      'Numerator = |4(3) - 3(-2) + 7| = |12 + 6 + 7| = 25',
      'Denominator = √(4² + (-3)²) = √(16 + 9) = √25 = 5',
      'Distance d = 25 / 5 = 5'
    ]
  },
  {
    id: 'geo-3',
    category: 'geometry',
    topic: 'Solid Frustum Volume & Similarity',
    difficulty: 'hard',
    question: 'A right circular cone of base radius R = 6 cm and height H = 12 cm is sliced by a plane parallel to its base at half its height (h = 6 cm from vertex). What is the volume of the remaining bottom frustum in terms of π?',
    formula: 'V_frustum = V_total - V_top',
    diagram: 'cylinder-volume',
    diagramLabels: { r: 6, h: 12 },
    options: [
      '72π cm³',
      '108π cm³',
      '18π cm³',
      '126π cm³'
    ],
    correctIndex: 3, // Option D
    hint: 'Total cone volume is (1/3)πR²H. The smaller top cone has linear scale factor 1/2, meaning its volume is (1/2)³ = 1/8 of total.',
    explanation: 'Total cone volume = (1/3)π(6²)(12) = 144π cm³. By 3D geometric similarity, the top cone has half the linear dimensions, so its volume is (1/2)³ = 1/8 of the total: (1/8)(144π) = 18π cm³. The bottom frustum volume is 144π - 18π = 126π cm³.',
    steps: [
      'V_total = (1/3) · π · 6² · 12 = 144π cm³',
      'Top cone linear ratio k = 1/2',
      'Top cone volume ratio = k³ = 1/8',
      'V_top = 144π / 8 = 18π cm³',
      'V_frustum = 144π - 18π = 126π cm³'
    ]
  },
  {
    id: 'geo-4',
    category: 'geometry',
    topic: '3D Space Diagonal (Cuboid)',
    difficulty: 'medium',
    question: 'A rectangular shipping container has inner dimensions 3 meters × 4 meters × 12 meters. What is the maximum length of a straight metal beam that can fit entirely inside along the space diagonal?',
    formula: 'd = √(l² + w² + h²)',
    diagram: 'right-triangle',
    diagramLabels: { a: 3, b: 4, c: 13 },
    options: [
      '15 meters',
      '13 meters',
      '√153 meters',
      '19 meters'
    ],
    correctIndex: 1, // Option B
    hint: 'Compute the 3D Euclidean space diagonal using √(3² + 4² + 12²).',
    explanation: 'd² = 3² + 4² + 12² = 9 + 16 + 144 = 169. Thus d = √169 = 13 meters.',
    steps: [
      'Floor diagonal d_floor = √(3² + 4²) = √25 = 5 m',
      'Space diagonal d = √(5² + 12²) = √(25 + 144) = √169',
      'd = 13 meters'
    ]
  },
  {
    id: 'geo-5',
    category: 'geometry',
    topic: 'Cyclic Quadrilateral & Inscribed Angles',
    difficulty: 'hard',
    question: 'In a cyclic quadrilateral ABCD inscribed in a circle, angle A = (3x + 10)° and angle C = (2x + 40)°. What is the exact measure of angle A?',
    formula: 'Opposite angles of a cyclic quadrilateral sum to 180°',
    options: [
      '76°',
      '94°',
      '88°',
      '102°'
    ],
    correctIndex: 2, // Option C
    hint: 'Opposite angles in any inscribed cyclic quadrilateral are supplementary: Angle A + Angle C = 180°.',
    explanation: '(3x + 10) + (2x + 40) = 180 ⟹ 5x + 50 = 180 ⟹ 5x = 130 ⟹ x = 26. Substituting x = 26 into angle A: 3(26) + 10 = 78 + 10 = 88°.',
    steps: [
      '(3x + 10) + (2x + 40) = 180°',
      '5x + 50 = 180°',
      '5x = 130° ⟹ x = 26°',
      'Angle A = 3(26) + 10 = 78 + 10 = 88°'
    ]
  },

  // ================= TRIGONOMETRY (ANALYSIS & IDENTITIES) =================
  {
    id: 'trig-1',
    category: 'trigonometry',
    topic: 'Trigonometric Equations & Solution Multiplicity',
    difficulty: 'hard',
    question: 'How many distinct solutions exist for the equation in the closed interval [0, 2π]:\n2cos²(x) - 3cos(x) + 1 = 0',
    formula: 'Quadratic in cos(x)',
    options: [
      '2 solutions',
      '3 solutions',
      '4 solutions (0, π/3, 5π/3, 2π)',
      '5 solutions'
    ],
    correctIndex: 2, // Option C
    hint: 'Factor as (2cos(x) - 1)(cos(x) - 1) = 0 and remember that [0, 2π] is inclusive of both endpoints 0 and 2π.',
    explanation: 'Factoring: (2cos(x) - 1)(cos(x) - 1) = 0. Either cos(x) = 1/2 or cos(x) = 1. In [0, 2π]: cos(x) = 1/2 gives x = π/3 and x = 5π/3 (2 solutions). cos(x) = 1 gives x = 0 and x = 2π (2 solutions). Total distinct solutions = 4.',
    steps: [
      'Factor: (2cos(x) - 1)(cos(x) - 1) = 0',
      'Case 1: cos(x) = 1/2 ⟹ x = π/3, 5π/3',
      'Case 2: cos(x) = 1 ⟹ x = 0, 2π',
      'Total solutions in [0, 2π]: {0, π/3, 5π/3, 2π} = 4 solutions'
    ]
  },
  {
    id: 'trig-2',
    category: 'trigonometry',
    topic: 'Exact Radical Trigonometric Values',
    difficulty: 'hard',
    question: 'What is the exact value of sin(15°)?',
    formula: 'sin(A - B) = sin(A)cos(B) - cos(A)sin(B)',
    options: [
      '(√6 + √2) / 4',
      '(√3 - 1) / 4',
      '(√2 - 1) / 2',
      '(√6 - √2) / 4'
    ],
    correctIndex: 3, // Option D
    hint: 'Express 15° as 45° - 30° and apply the sine difference identity.',
    explanation: 'sin(15°) = sin(45° - 30°) = sin(45°)cos(30°) - cos(45°)sin(30°) = (√2/2)(√3/2) - (√2/2)(1/2) = (√6 - √2) / 4.',
    steps: [
      'sin(45° - 30°) = sin(45°)cos(30°) - cos(45°)sin(30°)',
      '= (√2 / 2) · (√3 / 2) - (√2 / 2) · (1 / 2)',
      '= √6 / 4 - √2 / 4 = (√6 - √2) / 4'
    ]
  },
  {
    id: 'trig-3',
    category: 'trigonometry',
    topic: 'Law of Cosines with Obtuse Angles',
    difficulty: 'medium',
    question: 'In △ABC, side a = 5, side b = 8, and the included angle C = 120°. What is the exact length of side c?',
    formula: 'c² = a² + b² - 2ab cos(C)',
    options: [
      'c = 7',
      'c = √129',
      'c = √89',
      'c = 11'
    ],
    correctIndex: 1, // Option B
    hint: 'Recall that cos(120°) = -1/2, which makes the -2ab cos(C) term positive!',
    explanation: 'c² = 5² + 8² - 2(5)(8)cos(120°). Because cos(120°) = -1/2: c² = 25 + 64 - 80(-1/2) = 89 + 40 = 129. Therefore, c = √129. (Beware: subtracting 40 yields 49 ⟹ 7, which is a common sign error!).',
    steps: [
      'c² = 5² + 8² - 2(5)(8)cos(120°)',
      'cos(120°) = -1/2',
      'c² = 25 + 64 - (-40) = 89 + 40 = 129',
      'c = √129'
    ]
  },
  {
    id: 'trig-4',
    category: 'trigonometry',
    topic: 'Double Angle Identity Formulation',
    difficulty: 'hard',
    question: 'If tan(θ) = 3/4 and θ lies in Quadrant III, what is the exact value of cos(2θ)?',
    formula: 'cos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1',
    options: [
      '7/25',
      '-7/25',
      '24/25',
      '-24/25'
    ],
    correctIndex: 0, // Option A
    hint: 'In Quadrant III, both sin(θ) and cos(θ) are negative. Since tan(θ) = (-3)/(-4), cos(θ) = -4/5.',
    explanation: 'In Q3, opposite = -3, adjacent = -4, hypotenuse = 5. cos(θ) = -4/5. Using cos(2θ) = 2cos²(θ) - 1: cos(2θ) = 2(-4/5)² - 1 = 2(16/25) - 1 = 32/25 - 25/25 = 7/25.',
    steps: [
      'Hypotenuse = √((-3)² + (-4)²) = 5',
      'cos(θ) = -4/5',
      'cos(2θ) = 2cos²(θ) - 1 = 2(-4/5)² - 1',
      '= 2(16/25) - 1 = 32/25 - 25/25 = 7/25'
    ]
  },

  // ================= CALCULUS (AP / UNIVERSITY LEVEL) =================
  {
    id: 'calc-1',
    category: 'calculus',
    topic: 'L\'Hôpital\'s Rule on Indeterminate Limits',
    difficulty: 'hard',
    question: 'Evaluate the indeterminate limit:\nlim (x → 0) [e^(3x) - 1 - 3x] / x²',
    formula: 'Indeterminate form 0/0 ⟹ apply L\'Hôpital\'s Rule',
    options: [
      '0',
      '3',
      '9/2 (or 4.5)',
      'Limit does not exist'
    ],
    correctIndex: 2, // Option C
    hint: 'The limit produces 0/0. Apply L\'Hôpital\'s Rule twice consecutively.',
    explanation: 'At x = 0: (e⁰ - 1 - 0)/0 = 0/0. First derivative of top and bottom: [3e^(3x) - 3] / (2x), which is still 0/0. Second derivative: [9e^(3x)] / 2. As x → 0, 9e⁰ / 2 = 9/2 = 4.5.',
    steps: [
      'Form 0/0: apply d/dx top and bottom',
      'First L\'Hôpital: lim (x → 0) (3e^(3x) - 3) / (2x) [still 0/0]',
      'Second L\'Hôpital: lim (x → 0) (9e^(3x)) / 2',
      'Substitute x = 0: 9e⁰ / 2 = 9/2 = 4.5'
    ]
  },
  {
    id: 'calc-2',
    category: 'calculus',
    topic: 'Integration by Substitution (u-sub)',
    difficulty: 'hard',
    question: 'Evaluate the definite integral:\n∫₀^(√π)  x · sin(x²) dx',
    formula: 'Let u = g(x) and change integration limits',
    options: [
      '2',
      '0',
      '1',
      '-1'
    ],
    correctIndex: 2, // Option C
    hint: 'Let u = x², then du = 2x dx. When x = 0, u = 0; when x = √π, u = π.',
    explanation: 'Let u = x² ⟹ du = 2x dx ⟹ x dx = du/2. Bounds: x = 0 ⟹ u = 0; x = √π ⟹ u = π. Integral becomes (1/2) ∫₀^π sin(u) du = (1/2) [-cos(u)]₀^π = (1/2) [-cos(π) - (-cos(0))] = (1/2) [-(-1) - (-1)] = (1/2)(1 + 1) = 1.',
    steps: [
      'Let u = x² ⟹ du = 2x dx ⟹ x dx = du/2',
      'Transform bounds: u(0) = 0, u(√π) = π',
      '(1/2) ∫₀^π sin(u) du = (1/2) [-cos(u)]₀^π',
      '= (1/2) [(-cos(π)) - (-cos(0))]',
      '= (1/2) [1 + 1] = 1'
    ]
  },
  {
    id: 'calc-3',
    category: 'calculus',
    topic: 'Product & Chain Rule Derivative',
    difficulty: 'medium',
    question: 'Find the numerical derivative f\'(1) of the function:\nf(x) = x³ · ln(2x)',
    formula: 'd/dx [u · v] = u\'v + uv\' and d/dx [ln(kx)] = 1/x',
    options: [
      '3 · ln(2)',
      '3 · ln(2) + 1',
      'ln(2) + 3',
      '6 · ln(2) + 1'
    ],
    correctIndex: 1, // Option B
    hint: 'Apply product rule: f\'(x) = (3x²)ln(2x) + x³(1/x). Then evaluate at x = 1.',
    explanation: 'By product rule: f\'(x) = 3x² · ln(2x) + x³ · (1/(2x) · 2) = 3x² ln(2x) + x². Evaluating at x = 1: f\'(1) = 3(1)² ln(2) + (1)² = 3 ln(2) + 1.',
    steps: [
      'f\'(x) = d/dx(x³) · ln(2x) + x³ · d/dx(ln(2x))',
      'f\'(x) = 3x² ln(2x) + x³ · (1/x) = 3x² ln(2x) + x²',
      'Substitute x = 1: 3(1) ln(2) + 1 = 3 ln(2) + 1'
    ]
  },
  {
    id: 'calc-4',
    category: 'calculus',
    topic: 'Points of Inflection & Concavity',
    difficulty: 'hard',
    question: 'At which of the following x-values does the quartic curve f(x) = x⁴ - 6x³ + 12x² - 8x have a point of inflection where concavity changes sign?',
    formula: 'f\'\'(x) = 0 and f\'\'(x) changes sign',
    options: [
      'x = 3',
      'x = 0',
      'x = 1',
      'x = -2'
    ],
    correctIndex: 2, // Option C
    hint: 'Calculate f\'\'(x) and factor the quadratic: 12(x² - 3x + 2) = 0.',
    explanation: 'f\'(x) = 4x³ - 18x² + 24x - 8. f\'\'(x) = 12x² - 36x + 24 = 12(x² - 3x + 2) = 12(x - 1)(x - 2). The roots of f\'\'(x) are x = 1 and x = 2, where concavity switches between positive and negative. Thus x = 1 is an inflection point.',
    steps: [
      'f\'(x) = 4x³ - 18x² + 24x - 8',
      'f\'\'(x) = 12x² - 36x + 24 = 12(x - 1)(x - 2)',
      'Inflection roots: x = 1 and x = 2',
      'Sign changes across x = 1 (positive to negative)'
    ]
  },

  // ================= STATISTICS & PROBABILITY (ANALYTICAL) =================
  {
    id: 'stat-1',
    category: 'statistics',
    topic: 'Bayesian Conditional Probability',
    difficulty: 'hard',
    question: 'A diagnostic medical screening for a rare condition (prevalence 1% of population) has a 95% true positive rate and a 5% false positive rate. If a randomly selected patient tests positive, what is the probability they actually have the condition?',
    formula: 'P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|Dᶜ)P(Dᶜ)]',
    options: [
      '95%',
      '≈ 16.1% (19/118)',
      '50%',
      '≈ 5.5%'
    ],
    correctIndex: 1, // Option B
    hint: 'Use Bayes\' theorem: True Positives = 0.01 × 0.95 = 0.0095; False Positives = 0.99 × 0.05 = 0.0495.',
    explanation: 'By Bayes\' theorem: P(D|+) = (0.01 × 0.95) / [(0.01 × 0.95) + (0.99 × 0.05)] = 0.0095 / (0.0095 + 0.0495) = 0.0095 / 0.059 = 19 / 118 ≈ 16.1%. Because the disease is rare, false positives significantly outnumber true positives!',
    steps: [
      'P(D) = 0.01, P(Dᶜ) = 0.99',
      'P(+ ∩ D) = 0.01 × 0.95 = 0.0095',
      'P(+ ∩ Dᶜ) = 0.99 × 0.05 = 0.0495',
      'Total P(+) = 0.0095 + 0.0495 = 0.059',
      'P(D|+) = 0.0095 / 0.059 = 19/118 ≈ 16.1%'
    ]
  },
  {
    id: 'stat-2',
    category: 'statistics',
    topic: 'Binomial Distribution Probability',
    difficulty: 'medium',
    question: 'A fair 6-sided die is rolled 5 times. What is the exact probability of rolling the number "6" exactly twice?',
    formula: 'P(X = k) = C(n, k) · p^k · (1 - p)^(n - k)',
    options: [
      '625 / 3888 (≈ 16.08%)',
      '125 / 7776',
      '25 / 216',
      '10 / 36'
    ],
    correctIndex: 0, // Option A
    hint: 'Use C(5, 2) · (1/6)² · (5/6)³ where C(5, 2) = 10.',
    explanation: 'P(X = 2) = C(5, 2) · (1/6)² · (5/6)³ = 10 · (1/36) · (125/216) = 1250 / 7776. Simplifying by dividing numerator and denominator by 2 yields 625 / 3888 ≈ 16.08%.',
    steps: [
      'C(5, 2) = (5 × 4) / 2 = 10',
      'p² = (1/6)² = 1/36',
      'q³ = (5/6)³ = 125/216',
      'P = 10 × (1/36) × (125/216) = 1250 / 7776 = 625 / 3888'
    ]
  },

  // ================= ARITHMETIC & NUMBER THEORY =================
  {
    id: 'arith-1',
    category: 'arithmetic',
    topic: 'Modular Arithmetic & Large Exponents',
    difficulty: 'hard',
    question: 'What is the units digit (last digit) of the large number:\n7²⁰²⁶ ?',
    formula: 'Identify the cyclic pattern of powers of 7 modulo 10',
    options: [
      '7',
      '3',
      '1',
      '9'
    ],
    correctIndex: 3, // Option D
    hint: 'Powers of 7 end in 7, 9, 3, 1 repeating in cycles of 4. Find the remainder of 2026 divided by 4.',
    explanation: 'The units digits of powers of 7 follow a cycle of period 4: 7¹ ⟹ 7, 7² ⟹ 9, 7³ ⟹ 3, 7⁴ ⟹ 1. Dividing the exponent by 4: 2026 = 4 × 506 + 2, leaving a remainder of 2. Therefore, 7²⁰²⁶ has the same units digit as 7², which is 9.',
    steps: [
      'Cycle of 7ⁿ mod 10: [7, 9, 3, 1] (period 4)',
      '2026 mod 4 = 2',
      'The 2nd element in the cycle is 9',
      'Units digit = 9'
    ]
  },
  {
    id: 'arith-2',
    category: 'arithmetic',
    topic: 'Mixture Ratios & Weighted Averages',
    difficulty: 'medium',
    question: 'A lab technician needs to produce 60 liters of a 38% acid solution by mixing a 20% acid solution with a 50% acid solution. How many liters of the 50% solution must be used?',
    formula: 'c₁V₁ + c₂V₂ = c_final · V_final',
    options: [
      '24 liters',
      '36 liters',
      '30 liters',
      '42 liters'
    ],
    correctIndex: 1, // Option B
    hint: 'Let x be liters of 50% solution, so (60 - x) is liters of 20% solution. Solve 0.50x + 0.20(60 - x) = 0.38(60).',
    explanation: '0.50x + 0.20(60 - x) = 0.38(60) ⟹ 0.50x + 12 - 0.20x = 22.8 ⟹ 0.30x = 10.8 ⟹ x = 10.8 / 0.30 = 36 liters.',
    steps: [
      '0.50x + 0.20(60 - x) = 22.8',
      '0.30x + 12 = 22.8',
      '0.30x = 10.8',
      'x = 10.8 / 0.30 = 36 liters of 50% solution'
    ]
  }
];
