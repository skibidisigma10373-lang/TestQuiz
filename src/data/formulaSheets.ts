import { FormulaItem } from '../types/math';

export const formulaSheets: FormulaItem[] = [
  // Algebra
  {
    id: 'f-quad',
    name: 'Quadratic Formula',
    category: 'algebra',
    formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
    description: 'Finds solutions for any quadratic equation in standard form ax² + bx + c = 0.',
    example: 'For 2x² - 4x - 6 = 0: a=2, b=-4, c=-6 ⟹ x = 3 or x = -1.'
  },
  {
    id: 'f-diff-sq',
    name: 'Difference of Squares',
    category: 'algebra',
    formula: 'a² - b² = (a - b)(a + b)',
    description: 'Factoring identity for two squared terms separated by a minus sign.',
    example: 'x² - 36 = (x - 6)(x + 6).'
  },
  {
    id: 'f-slope',
    name: 'Slope & Linear Equation',
    category: 'algebra',
    formula: 'm = (y₂ - y₁) / (x₂ - x₁)  |  y - y₁ = m(x - x₁)',
    description: 'Slope of line passing through two coordinates and point-slope form.',
    example: 'Through (1, 2) and (3, 6): m = (6-2)/(3-1) = 2.'
  },

  // Geometry
  {
    id: 'f-pythagoras',
    name: 'Pythagorean Theorem',
    category: 'geometry',
    formula: 'a² + b² = c²',
    description: 'Relation among the three sides of a right triangle with hypotenuse c.',
    example: 'Legs 3 and 4 ⟹ 3² + 4² = 9 + 16 = 25 ⟹ c = 5.'
  },
  {
    id: 'f-circle',
    name: 'Circle Area & Circumference',
    category: 'geometry',
    formula: 'Area = πr²  |  Circumference = 2πr',
    description: 'Two-dimensional boundary length and internal space enclosed by a circle of radius r.',
    example: 'If r = 5: Area = 25π ≈ 78.54, Circumference = 10π ≈ 31.42.'
  },
  {
    id: 'f-dist-coord',
    name: '2D Coordinate Distance',
    category: 'geometry',
    formula: 'd = √((x₂ - x₁)² + (y₂ - y₁)²)',
    description: 'Euclidean distance between two Cartesian points (x₁, y₁) and (x₂, y₂).',
    example: '(0,0) to (3,4) ⟹ √(3² + 4²) = √25 = 5.'
  },
  {
    id: 'f-cylinder',
    name: 'Cylinder Volume & Surface Area',
    category: 'geometry',
    formula: 'V = πr²h  |  A = 2πrh + 2πr²',
    description: 'Volume and total surface area of a right cylinder.',
    example: 'r = 2, h = 5 ⟹ V = π(4)(5) = 20π ≈ 62.83.'
  },

  // Trigonometry
  {
    id: 'f-sohcahtoa',
    name: 'SOH CAH TOA Definitions',
    category: 'trigonometry',
    formula: 'sin(θ) = Opp/Hyp | cos(θ) = Adj/Hyp | tan(θ) = Opp/Adj',
    description: 'Fundamental trigonometric ratios in right-angled triangles.',
    example: 'Opposite=3, Hypotenuse=5 ⟹ sin(θ) = 0.6.'
  },
  {
    id: 'f-pythag-trig',
    name: 'Pythagorean Trig Identity',
    category: 'trigonometry',
    formula: 'sin²(θ) + cos²(θ) = 1',
    description: 'Identity true for any real angle θ on the Euclidean unit circle.',
    example: 'If cos(θ) = 0.8, sin²(θ) = 1 - 0.64 = 0.36 ⟹ sin(θ) = 0.6.'
  },
  {
    id: 'f-law-sines',
    name: 'Law of Sines',
    category: 'trigonometry',
    formula: 'a / sin(A) = b / sin(B) = c / sin(C)',
    description: 'Relates sides of any triangle to the sines of their opposite angles.',
    example: 'A=30°, B=45°, a=10 ⟹ b = 10 · sin(45°) / sin(30°) = 10√2.'
  },

  // Calculus
  {
    id: 'f-power-deriv',
    name: 'Power Rule for Derivatives',
    category: 'calculus',
    formula: 'd/dx [xⁿ] = n · xⁿ⁻¹',
    description: 'Differentiating polynomial terms of degree n.',
    example: 'd/dx [x⁵] = 5x⁴.'
  },
  {
    id: 'f-chain-rule',
    name: 'Chain Rule for Composite Functions',
    category: 'calculus',
    formula: 'd/dx [f(g(x))] = f\'(g(x)) · g\'(x)',
    description: 'Used to take derivatives of nested functions.',
    example: 'd/dx [(2x + 1)³] = 3(2x + 1)² · 2 = 6(2x + 1)².'
  },
  {
    id: 'f-power-integral',
    name: 'Power Rule for Integration',
    category: 'calculus',
    formula: '∫ xⁿ dx = (xⁿ⁺¹) / (n + 1) + C  (for n ≠ -1)',
    description: 'Indefinite integration of power terms.',
    example: '∫ x³ dx = x⁴ / 4 + C.'
  },

  // Statistics
  {
    id: 'f-mean-stat',
    name: 'Arithmetic Mean & Variance',
    category: 'statistics',
    formula: 'μ = (∑ xᵢ) / N  |  σ² = ∑ (xᵢ - μ)² / N',
    description: 'Expected value / center of mass and dispersion measure of a distribution.',
    example: 'Data [2, 4, 6]: Sum = 12, N = 3 ⟹ Mean = 4.'
  },
  {
    id: 'f-combinations',
    name: 'Combinations Formula (nCr)',
    category: 'statistics',
    formula: 'nCr = n! / (r! · (n - r)!)',
    description: 'Number of ways to choose r items from a set of n without regarding order.',
    example: '5C2 = 5! / (2! · 3!) = (5 · 4) / 2 = 10.'
  }
];
