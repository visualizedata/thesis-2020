<template>
  <div id="bar">
    <el-row class="block-col-2">
  <el-col :span="12">
    <span class="demonstration">click to trigger</span>
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-plus">Action 1</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus">Action 2</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-plus-outline">Action 3</el-dropdown-item>
        <el-dropdown-item icon="el-icon-check">Action 4</el-dropdown-item>
        <el-dropdown-item icon="el-icon-circle-check">Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
    <div id="center">
      <h3>{{ chartTitle }}</h3>
      <div>
        <p>Our inputs here</p>
        <input class="pink" type="number" placeholder="Edit me" v-model="data[0].grassy" />
        <input type="number" placeholder="Edit me" v-model="svgWidth" />
      </div>
      <svg :width="svgWidth" :height="svgHeight">
        <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
          <rect v-for="(element, index) in data"
          :x="scale.x(element.variety)"
          :y="scale.y(element.grassy)"
          :width="scale.x.bandwidth()"
          :height="height - scale.y(element.grassy)"
          :name="element.variety"
          :fill="myFill(index)"
          :key="index"
        />
        <g v-axis:x="scale" :transform="`translate(0, ${height})`"></g>
            <g v-axis:y="scale"></g>
        </g>

      </svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
export default {
  name: 'bar',
  data() {
      return{
    chartTitle: "Berry Variety : Grassy Taste",
    svgHeight: 300,
    svgWidth: 600,
    margin: {top: 25, left: 25, bottom: 25, right: 25 },
    data: [  
      { variety: "1",
        overall_like: 0.6741935484,
        overall_appear_like: 0.6806451613,
        taste_expect: 0.6387096774,
        color_like: 0.6806451613,
        color_jar: 0.9139784946,
        size_jar: 0.8924731183,
        taste_like: 0.6774193548,
        sweetness_intn: 0.6543778802,
        tartness_intn: 0.5161290323,
        blueberry_intn: 0.6543778802,
        sweetness_jar: 0.8387096774,
        tartness_jar: 0.8064516129,
        floral: 0.1935483871,
        berry: 0.6451612903,
        citrus: 0.1935483871,
        earthy: 0.1935483871,
        fermented: 0.09677419355,
        fruity: 0.5161290323,
        grassy: 0.1935483871,
        bitter: 0.03225806452,
        texture_like: 0.6548387097,
        firmness_intn: 0.66359447,
        crispness_intn: 0.6267281106,
        juciness_intn: 0.5898617512,
        seediness_intn: 0.3594470046,
        mealiness_intn: 0.6267281106,
        firmness_jar: 0.8709677419,
        crispness_jar: 0.8494623656,
        juciness_jar: 0.8172043011,
        taste_yn: 0.3548387097,
        taste_intn: 0.2516129032
        },
      { variety: "2",
        overall_like: 0.6811881188,
        overall_appear_like: 0.6772277228,
        taste_expect: 0.702970297,
        color_like: 0.6851485149,
        color_jar: 0.9240924092,
        size_jar: 0.7623762376,
        taste_like: 0.6831683168,
        sweetness_intn: 0.5968882603,
        tartness_intn: 0.5700141443,
        blueberry_intn: 0.6336633663,
        sweetness_jar: 0.8514851485,
        tartness_jar: 0.8481848185,
        floral: 0.297029703,
        berry: 0.6831683168,
        citrus: 0.1782178218,
        earthy: 0.1584158416,
        fermented: 0.0396039604,
        fruity: 0.4257425743,
        grassy: 0.1089108911,
        bitter: 0.1188118812,
        texture_like: 0.7059405941,
        firmness_intn: 0.6718528996,
        crispness_intn: 0.6619519095,
        juciness_intn: 0.6591230552,
        seediness_intn: 0.3281471004,
        mealiness_intn: 0.6619519095,
        firmness_jar: 0.9570957096,
        crispness_jar: 0.9339933993,
        juciness_jar: 0.897689769,
        taste_yn: 0.3564356436,
        taste_intn: 0.2376237624
        },
      { variety: "3",
        overall_like: 0.6079207921,
        overall_appear_like: 0.6326732673,
        taste_expect: 0.598019802,
        color_like: 0.6792079208,
        color_jar: 0.9306930693,
        size_jar: 0.7755775578,
        taste_like: 0.601980198,
        sweetness_intn: 0.5304101839,
        tartness_intn: 0.6067892504,
        blueberry_intn: 0.5912305516,
        sweetness_jar: 0.795379538,
        tartness_jar: 0.798679868,
        floral: 0.1188118812,
        berry: 0.6633663366,
        citrus: 0.198019802,
        earthy: 0.1188118812,
        fermented: 0.0495049505,
        fruity: 0.4455445545,
        grassy: 0.1089108911,
        bitter: 0.0297029703,
        texture_like: 0.6455445545,
        firmness_intn: 0.6280056577,
        crispness_intn: 0.6011315417,
        juciness_intn: 0.5954738331,
        seediness_intn: 0.3988684583,
        mealiness_intn: 0.6011315417,
        firmness_jar: 0.9174917492,
        crispness_jar: 0.904290429,
        juciness_jar: 0.8811881188,
        taste_yn: 0.2772277228,
        taste_intn: 0.1821782178
        },
      { variety: "4",
        overall_like: 0.595049505,
        overall_appear_like: 0.6772277228,
        taste_expect: 0.6376237624,
        color_like: 0.6742574257,
        color_jar: 0.9108910891,
        size_jar: 0.8481848185,
        taste_like: 0.5920792079,
        sweetness_intn: 0.4879773692,
        tartness_intn: 0.6591230552,
        blueberry_intn: 0.5728429986,
        sweetness_jar: 0.7293729373,
        tartness_jar: 0.8085808581,
        floral: 0.1386138614,
        berry: 0.6138613861,
        citrus: 0.2277227723,
        earthy: 0.2673267327,
        fermented: 0.0495049505,
        fruity: 0.4059405941,
        grassy: 0.1683168317,
        bitter: 0.07920792079,
        texture_like: 0.6366336634,
        firmness_intn: 0.6166902405,
        crispness_intn: 0.6025459689,
        juciness_intn: 0.5827439887,
        seediness_intn: 0.4016973126,
        mealiness_intn: 0.6025459689,
        firmness_jar: 0.8877887789,
        crispness_jar: 0.8877887789,
        juciness_jar: 0.8547854785,
        taste_yn: 0.2871287129,
        taste_intn: 0.1702970297
        },
      { variety: "5",
        overall_like: 0.6346534653,
        overall_appear_like: 0.6475247525,
        taste_expect: 0.6336633663,
        color_like: 0.6376237624,
        color_jar: 0.8943894389,
        size_jar: 0.8184818482,
        taste_like: 0.6445544554,
        sweetness_intn: 0.5685997171,
        tartness_intn: 0.4908062235,
        blueberry_intn: 0.5841584158,
        sweetness_jar: 0.8151815182,
        tartness_jar: 0.798679868,
        floral: 0.2079207921,
        berry: 0.6732673267,
        citrus: 0.1287128713,
        earthy: 0.1782178218,
        fermented: 0.0396039604,
        fruity: 0.3564356436,
        grassy: 0.1881188119,
        bitter: 0.07920792079,
        texture_like: 0.6435643564,
        firmness_intn: 0.5643564356,
        crispness_intn: 0.5417256011,
        juciness_intn: 0.5968882603,
        seediness_intn: 0.3465346535,
        mealiness_intn: 0.5417256011,
        firmness_jar: 0.8745874587,
        crispness_jar: 0.8514851485,
        juciness_jar: 0.8877887789,
        taste_yn: 0.3168316832,
        taste_intn: 0.2138613861
        },
      { variety: "6",
        overall_like: 0.6811881188,
        overall_appear_like: 0.7108910891,
        taste_expect: 0.6831683168,
        color_like: 0.7089108911,
        color_jar: 0.9372937294,
        size_jar: 0.8514851485,
        taste_like: 0.697029703,
        sweetness_intn: 0.630834512,
        tartness_intn: 0.6025459689,
        blueberry_intn: 0.676096181,
        sweetness_jar: 0.897689769,
        tartness_jar: 0.8514851485,
        floral: 0.2376237624,
        berry: 0.8118811881,
        citrus: 0.198019802,
        earthy: 0.08910891089,
        fermented: 0.0495049505,
        fruity: 0.495049505,
        grassy: 0.1584158416,
        bitter: 0.05940594059,
        texture_like: 0.6920792079,
        firmness_intn: 0.6449787836,
        crispness_intn: 0.6350777935,
        juciness_intn: 0.6591230552,
        seediness_intn: 0.3536067893,
        mealiness_intn: 0.6350777935,
        firmness_jar: 0.9207920792,
        crispness_jar: 0.9273927393,
        juciness_jar: 0.9174917492,
        taste_yn: 0.3069306931,
        taste_intn: 0.2316831683
        },
      { variety: "7",
        overall_like: 0.6085714286,
        overall_appear_like: 0.6828571429,
        taste_expect: 0.6714285714,
        color_like: 0.6971428571,
        color_jar: 0.919047619,
        size_jar: 0.8238095238,
        taste_like: 0.6128571429,
        sweetness_intn: 0.5142857143,
        tartness_intn: 0.6346938776,
        blueberry_intn: 0.5918367347,
        sweetness_jar: 0.7619047619,
        tartness_jar: 0.7952380952,
        floral: 0.1857142857,
        berry: 0.7,
        citrus: 0.1714285714,
        earthy: 0.1,
        fermented: 0.05714285714,
        fruity: 0.4,
        grassy: 0.1,
        bitter: 0.04285714286,
        texture_like: 0.66,
        firmness_intn: 0.6081632653,
        crispness_intn: 0.6,
        juciness_intn: 0.6326530612,
        seediness_intn: 0.3755102041,
        mealiness_intn: 0.6,
        firmness_jar: 0.8952380952,
        crispness_jar: 0.9238095238,
        juciness_jar: 0.8857142857,
        taste_yn: 0.3714285714,
        taste_intn: 0.2371428571
        },
      { variety: "8",
        overall_like: 0.5891089109,
        overall_appear_like: 0.6564356436,
        taste_expect: 0.6633663366,
        color_like: 0.6564356436,
        color_jar: 0.8877887789,
        size_jar: 0.798679868,
        taste_like: 0.5643564356,
        sweetness_intn: 0.5190947666,
        tartness_intn: 0.6237623762,
        blueberry_intn: 0.5714285714,
        sweetness_jar: 0.7656765677,
        tartness_jar: 0.7491749175,
        floral: 0.1683168317,
        berry: 0.603960396,
        citrus: 0.2574257426,
        earthy: 0.198019802,
        fermented: 0.07920792079,
        fruity: 0.3861386139,
        grassy: 0.2178217822,
        bitter: 0.1386138614,
        texture_like: 0.6207920792,
        firmness_intn: 0.7086280057,
        crispness_intn: 0.6690240453,
        juciness_intn: 0.5558698727,
        seediness_intn: 0.4398868458,
        mealiness_intn: 0.6690240453,
        firmness_jar: 0.8349834983,
        crispness_jar: 0.8679867987,
        juciness_jar: 0.8118811881,
        taste_yn: 0.4158415842,
        taste_intn: 0.2415841584
        },
      { variety: "9",
        overall_like: 0.6118811881,
        overall_appear_like: 0.6742574257,
        taste_expect: 0.6613861386,
        color_like: 0.6673267327,
        color_jar: 0.9108910891,
        size_jar: 0.8217821782,
        taste_like: 0.5851485149,
        sweetness_intn: 0.5148514851,
        tartness_intn: 0.6082036775,
        blueberry_intn: 0.5629420085,
        sweetness_jar: 0.7491749175,
        tartness_jar: 0.801980198,
        floral: 0.1683168317,
        berry: 0.6732673267,
        citrus: 0.2475247525,
        earthy: 0.1386138614,
        fermented: 0.0495049505,
        fruity: 0.4059405941,
        grassy: 0.1485148515,
        bitter: 0.1386138614,
        texture_like: 0.6376237624,
        firmness_intn: 0.6421499293,
        crispness_intn: 0.6322489392,
        juciness_intn: 0.5869872702,
        seediness_intn: 0.3465346535,
        mealiness_intn: 0.6322489392,
        firmness_jar: 0.9108910891,
        crispness_jar: 0.9273927393,
        juciness_jar: 0.8547854785,
        taste_yn: 0.3366336634,
        taste_intn: 0.2
        }
    ]
    }
  },
    methods: {
      myFill(index) {
      if (index === 0) {
        return "#0b4780"
      } else {
        return "#0b4780"
      }
    }
  },
  computed: {
    width() {
      return this.svgWidth - this.margin.left - this.margin.right;
    },
    height() {
      return this.svgHeight - this.margin.top - this.margin.bottom;
    },
    // scale = {
    //   x: () => {
    //     do something
    //     return x
    // }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions
    scale() {
      const x = d3
        .scaleBand()
        .domain(this.data.map(x => x.variety))
        // https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        .rangeRound([0, this.width])
        .padding(0.6); // There is also paddingInner and paddingOuter if preferred
      const y = d3
        .scaleLinear()
        // The spread operator ... can be used to convert an array
        // in places where a list of parameters is expected.
        // Because we are using a method here, Math.max(1, 2, 3) is expected.
        // The new mapped array is transformed with ...
        // so it can be interpreted by Math.max()
        .domain([0, Math.max(...this.data.map(x => x.grassy))])
        .rangeRound([this.height, 0]); // Already flipped
      return { x, y };
    }
  },
  directives: {
    axis(el, binding) {
      console.log(el); // this is the g
      console.log(binding); // the scale object
      const axis = binding.arg; // x or y
      // Line below defines an object and immediately calls
      // only the property for x or y
      // it’s basically like a ternary expression
      const axisMethod = { x: "axisBottom", y: "axisLeft" }[axis];
      // The line below assigns the x or y function of the scale object
      const methodArg = binding.value[axis];
      // The variable assignments above are a very concise way to
      // guarantee that d3 can select *this* element and call
      // the axis method on it
      // with the right argument
      // so it ends up equivalent to the expression
      // d3.axisBottom(scale.x)
      d3.select(el).call(d3[axisMethod](methodArg));
    }
  }
}
</script>
