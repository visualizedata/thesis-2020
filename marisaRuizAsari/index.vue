<template>
  <div class="content">
    <div id="fixed-progress">
      <div id="progress-bar"></div>
    </div>
    <!-- <navBar id="nav-bar"></navBar> -->
    <div id="landing" class="just-center">
        <div class="hero-img-holder">
            <img id="hero-img" src="~/static/hero3.svg">
        </div>
        <div class="just-center c-white max-430 title-info">
          <h2 id="page-title"><strong>Weapons <span class="of">of</span> <br> Mass Injustice</strong></h2>
          <p class="italic sub-title">Visualizing the unequal impacts of gun violence and the search for peace in America's cities</p>
          <div class="line-sep-cont"><div class="line-sep"></div></div>
          <p>by Marisa Ruiz Asari</p>
          <div class="intro-text-holder">
            <div class="introd-text">
                <p>
                <span class="first-character">A</span>mericans are 25 times more likely to be killed by a gun than residents of countries with similar GDPs. Contrary to media portrayals and policy discussions of the gun violence crisis in the US framed around mass shootings, daily gun violence – shootings that result in the disproportionate killing of young people of color and the loss of life to suicide – make up the majority of gun deaths in the US. 
                </p>
                <p>
                    Gun violence and firearm offense data have historically been used to justify the criminalization of Black and Brown youth in America. But what if the gun violence crisis was treated as a public health crisis rather than another cause for mass incarceration? This visual essay explores data on daily gun violence and documents efforts working to promote peace and collective healing.
                </p>
            </div>
          </div>
        </div>
    </div>
    <client-only>
        <Scrollama id="scroll-cont"
        :debug="false"
        :offset="0.5"
        @step-enter="setGraphicContent"
        @step-exit="resetContent"
        >
            <div class="graphic" slot="graphic">
                <div v-show="currStep == '1' || currStep == '2'" id="three-intro">
                    <div class="candles-back"></div>
                    <div class="candle-group">
                        <div id="candles" :style="{bottom: candlesBot + '%'}">
                            <img width="100%" src="~assets/candles.svg" alt="candles">   
                        </div>
                    </div>
                </div>
                <div  v-if="currStep == '3'" id="vid-holder">
                    <div class="rel">
                        <video id="citi-field-video" src="~assets/citi-stadium-lowres.mp4" muted="true" autoplay></video>
                        <div class="vid-cover"></div>
                    </div>
                    <!-- <div id="vid-text">That's enough to fill Citi Field baseball stadium in Queens, New York</div> -->
                </div>
                <div  v-show="currStep == 'stadium video'" id="vid-holder">
                    <div class="br-dark"></div>
                    <div class="rel">
                      <video v-show="currStep == 'stadium video' && subStep != 'seats rearrange'" id="google-earth-video" src="~assets/citi-g-earth-lowres.mp4" muted="true" autoplay></video>
                      <div class="vid-cover"></div>
                      <seats :style="{opacity: stadiumOp, position: 'absolute', top: '0', left: '0', width: 'auto', height: '100%'}"></seats>
                    </div>
                </div>
                <div  v-show="currStep == 'rates'">
                    <div class="br-dark"></div>
                    <div class="seats-highlight-holder">
                        <div v-show="subStep == 'seatsHighlight' || subStep == 'seatsHighlight2'" class="stadium-overlay-text2 c-grey" id="over-1">Gun deaths per 100,000 people</div>
                        <seatHighlight v-if="subStep == 'seatsHighlight' || subStep == 'seatsHighlight2'" class="seats-highlight" v-animatePeople></seatHighlight>
                    </div>
                    <img id="hundredk-img" src="~static/100k.png">
                    <div v-show="subStep == 'rates2'" class="stadium-overlay-text c-white" id="over-1">100,000 people – 2.5&nbsp;Citi&nbsp;Field&nbsp;Stadiums</div>
                    <!-- <div id="over-2 c-white">100,000</div> -->
                </div>
                <div v-if="currStep == 'age break' || currStep == 'age break highlight'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                        <line-chart id="age-break-1" :chart-data="cd.lineChartData" :options="lineChartOptionsLabels('Gun Death Rates by Age', 'Gun deaths per 100k residents', 'Age group')" :height="500" :width="950"></line-chart>
                        <img v-if="currStep == 'age break highlight'" class="highlight-img" src="~/static/test-highlight-01.png" alt="">
                    </div>
                </div>
                <div v-if="currStep == 'age break 2' || currStep == 'age break 2 highlight'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                        <line-chart id="age-break-1" :chart-data="cd.lineChartData2" :options="lineChartOptionsLabels('Gun Death Rates by Age', 'Gun deaths per 100k residents', 'Age group')" :height="500" :width="950"></line-chart>
                         <img v-if="currStep == 'age break 2'" class="highlight-img" src="~/static/graph-highlight-2.png" alt="">
                    </div>
                </div>
                <div v-if="currStep == 'even more' || currStep == 'peaks'">
                    <div class="br-dark"></div>
                    <div class="chart-holder">
                        <div class="small-mult-holder">
                            <div v-for="(race,index) in raceChartData" :key="index" class="race-chart-holder">
                                    <line-chart ref="race-line-chart" :chart-data="raceChartData[index]" :options="lineChartPlainOptions" :height="100" :width="200"></line-chart>
                                <div class="race-label c-white">{{race['race-eth']}}</div>
                            </div>
                        </div>
                        <div id="small-mult-legend-holder">
                            <img id="small-mult-legend" src="~/static/small-mult-legend.png" alt="legend">
                        </div>
                    </div>
                </div>
                <div v-if="currStep == 'race age all'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                    <line-chart ref="race-line-chart" :chart-data="cd.ageRaceChartData" :options="lineChartOptionsLabels('Gun Death Rates by Age', 'Gun deaths per 100k residents', 'Age group', 'no legend')" :height="400" :width="800"></line-chart>
                    </div>
                </div>
                <div v-if="currStep == 'break down race'">
                    <div class="br-dark"></div>
                    <img id="bw-compare" src="~static/B_compare4.svg" alt="">
                </div>
                <div v-if="currStep == 'does not stop'">
                    <div class="br-dark"></div>
                </div>
                <div v-show="currStep == 'us incarceration intro' || currStep == 'us incarceration' || currStep == 'homicide and incarceration'">
                    <div class="br-dark"></div>
                    <div class="section-title-overlay c-grey" v-if="currStep == 'us incarceration' || currStep == 'homicide and incarceration'">Incarcerated people per 100,000 residents</div>
                    <incarCompare id="incarCompare"/>
                </div>
                <div v-if="currStep == 'firearm crimes'">
                    <div class="br-dark"></div>
                </div>
                <div v-if="currStep == 'arrested'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                        <line-chart id="arrestChart" ref="race-line-chart" :chart-data="cd.arrestWeaponsLineChartData" :options="lineChartOptionsLabels('Arrest Rates for Weapons Possession by Race/Ethnicity', 'Arrests per 100k residents', 'Year')" :height="350" :width="700"></line-chart>
                    </div>
                </div>
                <div v-if="currStep == 'jailed'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                        <line-chart ref="race-line-chart" :chart-data="cd.jailLineChartData" :options="lineChartOptionsLabels('Jail Rates by Race Ethnicity', 'Jailed people per 100k residents', 'Year')" :height="350" :width="700"></line-chart>
                    </div>
                </div>
                <div v-if="currStep == 'alarmingly disparate'">
                    <div class="br-dark"></div>
                </div>
                <div v-if="currStep == 'still disparate'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                        <line-chart ref="race-line-chart" :chart-data="cd.prisonerTimeLineChartData" :options="lineChartOptionsLabels('Incarceration Rates by Race/Ethnicity', 'Incarcerated people per 100k residents', 'Year')" :height="350" :width="700"></line-chart>
                    </div>
                </div>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'criminality'">
                        <div class="br-dark"></div>
                        <img src="~static/grid_1.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'entire response'">
                        <div class="br-dark"></div>
                        <img src="~static/grid_1.2.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'perpetrators'">
                        <div class="br-dark"></div>
                        <img src="~static/grid_2.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'connected' || currStep == 'addressing'">
                        <div class="br-dark"></div>
                        <img src="~static/grid_3.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'local strategies'">
                        <div class="br-dark"></div>
                        <img src="~static/grid_4.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'tailored support'">
                        <div class="br-dark"></div>
                        <img src="~static/focused_strategy.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'epidemic'">
                        <div class="br-dark"></div>
                        <img src="~static/tailored_support.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'diff solutions'">
                        <div class="br-dark"></div>
                        <img src="~static/local_types.svg" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'programs' || currStep == 'combination'">
                        <div class="br-dark"></div>
                        <programMap/>
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'common thread'">
                        <div class="br-dark"></div>
                        <img src="~static/common_thread.svg" alt="">
                    </div>
                </transition>
                <div v-if="currStep == 'Richmond'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                      <line-chart id="richmond-chart" :chart-data="cd.richmondChartData" :options="lineChartOptionsLabels('Gun Homicides in Richmond, CA', 'Gun Homicides', 'Year')" :height="500" :width="950"></line-chart>
                    </div>
                </div>
                <div v-if="currStep == 'Richmond2'">
                    <div class="br-dark"></div>
                    <div class="line-chart-holder">
                      <line-chart id="richmond-chart2" :chart-data="cd.richmondCountChartData" :options="lineChartOptionsLabels('Non-fatal shootings in Richmond, CA', 'Shootings', 'Year', 'no legend')" :height="500" :width="950"></line-chart>
                    </div>
                </div>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'media'">
                        <div class="br-dark"></div>
                        <img src="~static/media5.svg" width="100%" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'media2'">
                        <div class="br-dark"></div>
                        <img src="~static/media6.svg" width="100%" alt="">
                    </div>
                </transition>
                <transition name="fade" tag="div">
                    <div class="fadeImg" v-show="currStep == 'mass police'">
                        <div class="br-dark"></div>
                        <img src="~static/mass_police.svg" width="100%" alt="">
                    </div>
                </transition>
                
            </div>
            <!-- start steps -->
            <div class="step" data-step-no="1"></div>
            <div class="step" data-step-no="2">
              <div class="step-text m-bottom text-center">
                <h2 class="c-white">In 2018 <span class="big-num">39,201</span><br>Americans were killed by a gun</h2>
              </div>
            </div>
            <div class="step" data-step-no="3">
                <div id="vid-text">That's enough to fill Citi Field baseball stadium in Queens, New York</div>
            </div>
            <div class="step" data-step-no="stadium video" data-substep="stadium video play">
            </div>
            <div class="step" data-step-no="stadium video" data-substep="seats suicides">
                <div class="step-text">
                    <span>62%</span> of gun deaths in 2018 were suicides. 
                </div>
            </div>
            <div class="step" data-step-no="stadium video" data-substep="seats homicides">
                <div class="step-text">
                    <span>36%</span> were gun homicides. 
                </div>
            </div>
            <div class="step" data-step-no="stadium video" data-substep="seats other">
                <div class="step-text">
                    <span>2%</span> were other types of gun violence or were of an undetermined nature.
                </div>
            </div>
            <div class="step" data-step-no="stadium video" data-substep="seats rearrange">
                <div class="step-text">
                    While these numbers paint a grim picture, percentages and annual gun death counts can only tell us so much about the nature of gun violence in the US. 
                </div>
            </div>
            <div class="step" data-step-no="rates" data-substep="rates">
                <div class="step-text">
                    To fully understand this crisis, we need to look at rates, often measured as the number of gun deaths per 100,000 people.                
                </div>
            </div>
            <div class="step" data-step-no="rates" data-substep="rates2">
            </div>
            <div class="step" data-step-no="rates" data-substep="seatsHighlight">
                <div class="step-text">
                   On average, there were 12 gun deaths for every 100,000 Americans in 2018.
                </div>
            </div>
            <!-- <div class="step" data-step-no="rates" data-substep="seatsHighlight2">
                <div class="step-text">
                   If we look at only Americans between ages 25-34, the gun death rate rises to 17.
                </div>
            </div> -->
            <div class="step" data-step-no="age break">
                <div class="step-text">
                    By breaking down the gun death rate by 10 year age categories, we start to see that gun violence doesn't impact all Americans equally.
                     <p class="sub-text">Interact with this graph by toggling the legend items or hovering on data points</p>
                </div>
            </div>
            <div class="step" data-step-no="age break highlight">
                <div class="step-text">
                    The plot of death rates by age has two peaks, one around ages 15-34, and another for ages 75-84.
                </div>
            </div>
            <div class="step" data-step-no="age break 2">
                <div class="step-text">
                    But these peaks are driven by two very different types of gun deaths. Gun homicides are the highly concentrated around young Americans, while gun suicide is more evenly dispersed and highest amongst older populations.
                    <p class="sub-text">Interact with this graph by toggling the legend items or hovering on data points</p>

                </div>
            </div>
            <div class="step" data-step-no="age break 2 highlight">
                <div class="step-text">
                    This graph highlights two very distinct types of gun violence in the US, but it fails to capture even greater inequities in gun violence each year.
                </div>
            </div>
            <div class="step" data-step-no="even more">
                <div class="step-text">
                    The largest inequities in gun death become apparent when we look at these rates by race/ethnicity.
                </div>
            </div>
            <div class="step" data-step-no="race age all">
                <div class="step-text">
                    The gun homicide rate for young Black Americans is significantly greater than both the gun homicide or gun suicide rate of any other age or racial/ethnic group.
                    <p class="sub-text">Interact with this graph by hovering on points</p>
                </div>
            </div>
            <div class="step" data-step-no="break down race">
            </div>
             <div class="step" data-step-no="break down race">
                <div class="step-text">
                    And while gun suicide is considered a public health crisis, gun violence is framed as a crisis of criminality.
                </div>
            </div>
            <div class="step" data-step-no="us incarceration intro">
                <div class="step-text">
                   Some might ask why addressing gun violence solely through law enforcement and the criminal justice system is problematic. Let’s talk about why.
                </div>
            </div>
            <div class="step" data-step-no="us incarceration">
                <div class="step-text">
                  The US has the highest incarceration rate in the world, with 698 people incarcerated for every 100,000 residents. That’s 1.6 times the rate of Brazil, 6 times the  rate of Canada, and 15 times the rate of Japan.
                </div>
            </div>
            <div class="step" data-step-no="homicide and incarceration">
                <div class="step-text">
                  The vast differences in the rate of gun homicides are mirrored by the racial inequities of incarceration in the US. While young Black men are most likely to be victims of gun homicide in the US, they are also most likely to be incarcerated.
                </div>
            </div>
            <div class="step" data-step-no="arrested">
                <div class="step-text">
                    More broadly, Black Americans are most likely to be arrested for weapons possession, despite research showing that gun ownership is higher amongst White Americans.
                    <p class="sub-text">Interact with this graph by toggling the legend items or hovering on data points</p>
                </div>
            </div>
            <div class="step" data-step-no="jailed">
                <div class="step-text">
                    Black Americans are also overwhelmingly most likely to be jailed.
                    <p class="sub-text">Interact with this graph by toggling the legend items or hovering on data points</p>
                </div>
            </div>
            <div class="step" data-step-no="still disparate">
                <div class="step-text">
                    And though overall incarceration rates have seen recent declines, rates remain higher for non-White Americans, and in particular for men of color. 
                    <p class="sub-text">Interact with this graph by toggling the legend items or hovering on data points</p>
                </div>
            </div>
            <div class="step" data-step-no="criminality">
                <div class="step-text">
                    The statistics we've just explored have historically been used to support race based theories of criminality, harmful and unsubstantiated theories that frame communities of color in the US as supporting cultures of violence. 
                </div>
            </div>
            <div class="step" data-step-no="entire response">
                <div class="step-text">
                    And these theories have in turn supported law enforcement tactics treat entire communities as responsible for high rates of violence, such as heavier policing in communities of color as well as racist law enforcement programs such as Stop and Frisk. 
                </div>
            </div>
            <div class="step" data-step-no="perpetrators">
                <div class="step-text">
                    Yet data shows that the perpetrators of gun violence often constitute less than 1% of the population in major cities in the US. 
                </div>
            </div>
            <div class="step" data-step-no="connected">
                <div class="step-text">
                    And that these individuals are often connected and caught in cycles of retaliatory violence.
                </div>
            </div>
            <div class="step" data-step-no="programs" data-substep="programs-static">
                <div class="step-text">
                    In response, many cities across the US have implemented local intervention strategies that work to humanize rather than criminalize those at the center of gun violence. 
                    <p class="sub-text">Hover on a location to learn more about each program or on a county to see the gun homicide rate between 2010-2018.</p>
                </div>
            </div>
            <div class="step" data-step-no="programs" data-substep="programs-interactive">
            </div>
            <div class="step" data-step-no="tailored support">
                <div class="step-text">
                    They have found that focusing on small networks of known individuals involved in firearm activity is more effective than heavily policing entire neighborhoods.
                </div>
            </div>
            <div class="step" data-step-no="epidemic">
                <div class="step-text">
                    These local strategies work by offering tailored support and messaging that individuals at the center of gun violence are valued and that both their safety and accountability is critical to overall community well-being.
                </div>
            </div>
            <div class="step" data-step-no="epidemic">
                <div class="step-text">
                    By framing these individuals as assets to the community, they promote peace and accountability without further contributing to systems of mass incarceration and racial inequity in the US.
                </div>
            </div>
            <div class="step" data-step-no="diff solutions">
                <div class="step-text">
                    Some work independently to de-escalate potentially lethal situations while others work in partnership with law enforcement to build community trust. Others yet work out of hospitals, reaching individuals after they have been injured by a firearm to end cycles of retaliation.
                </div>
            </div>
            <div class="step" data-step-no="common thread">
                <div class="step-text">
                    The common thread amongst these strategies is that all rely on the expertise of community members and individuals who have deep personal experiences with cyclical gun violence. 
                </div>
            </div>
            <!-- <div class="step" data-step-no="local strategies">
                <div class="step-text">
                    Local, evidence-based gun violence reduction approaches take a new look at the drivers of gun violence and work to 
                </div>
            </div> -->

            <div class="step" data-step-no="Richmond">
                <div class="step-text">
                    And the results provide reason for consideration. Richmond, CA, at its peak labeled as one of the most deadly cities in the US, saw gun homicides decrease by over 40% after launching its local gun violence reduction program, the Office of Neighborhood Safety, in 2007. 
                    <p class="sub-text">Interact with this graph by toggling the legend items or hovering on data points</p>
                </div>
            </div>
            <div class="step" data-step-no="Richmond2">
                <div class="step-text">
                    Non-fatal shootings also fell significantly after the program was adopted.
                </div>
            </div>
            <!-- <div class="step" data-step-no="Chicago">
                <div class="step-text">
                    In Chicago, IL, the Ceasefire program decreased shootings by 38% and killings by 29% in two neighborhoods with some of the city’s highest gun violence rates.
                </div>
            </div> -->
            <!-- <div class="step" data-step-no="addressing">
                <div class="step-text">
                    Addressing the most pervasive forms of gun violence requires strategies that address the unique drivers of gun violence at the community level, and finding ways to address gun violence without further contributing to systems of mass incarceration and racial inequity in the US. 
                </div>
            </div> -->
            <div class="step" data-step-no="addressing">
                <div class="step-text">
                    These programs, as part of a larger integrated set of gun violence reduction strategies, show that local, community-based gun violence reduction programs can contribute meaningful solutions to America’s gun crisis, and particularly the impacts of gun violence on communities of color, without detracting from much needed policy level gun reform. 
                </div>
            </div>
            <!-- <div class="step" data-step-no="">
                <div class="step-text">
                    The two largest and least visible contributors to the annual gun death toll in the US – gun suicides and daily individual gun homicides – may have different root causes, but successful approaches that prevent imminent gun injuries of either nature rely on the same tactic: deescalating potentially lethal situations by reaching individuals most likely to harm or be harmed.
                </div>
            </div> -->
            <div class="step" data-step-no="media">
                <div class="step-text">
                    Recent movements including March For Our Lives and Black Lives Matters have done powerful work to bring mass shootings and police shootings to the forefront of media and policy discussionns. 
                </div>
            </div>
            <div class="step" data-step-no="media2">
                <div class="step-text">
                    So, what will it take to elevate daily gun violence to this national discourse? And how do we reckon with a gun violence crisis that disproportionately kills and criminalizes black and brown youth? 
                    <p class="sub-text">Explore the resources below to learn more about this work being undertaken by cities and organizations around the country.</p>
                </div>
            </div>
            <div class="step" data-step-no="media2">
            </div>
        </Scrollama>
    </client-only>
    <div class="br-grad">
        <img id="closing-candles" src="~/assets/candles.svg" alt="">
        <div id="learn-more">Learn More</div>
        <div class="resources-container">
            <div class="resource-box">
                <div class="resource-group">Gun violence reduction models</div>
                <div class="resource-links">
                    <p><a href="https://nnscommunities.org/strategies/group-violence-intervention/">Group Violence Intervention</a></p>
                    <p><a href="https://www.advancepeace.org/">Advance Peace</a></p>
                    <p><a href="https://www.thehavi.org/">Hospital Based Violence Intervention Programs</a></p>
                    <p><a href="https://cvg.org/">Cure Violence</a></p>
                </div>
            </div>
            <div class="resource-box">
                <div class="resource-group">Policy & Advocacy</div>
                <div class="resource-links">
                    <p><a href="https://giffords.org/issue/urban-gun-violence/">Giffords Law Center</a></p>
                    <p><a href="https://everytownresearch.org/gun-violence-cities/">Everytown for Gun Safety</a></p>
                    <p><a href="https://www.vera.org/">Vera Institute of Justice</a></p>
                </div>
            </div>
            <div class="resource-box">
                <div class="resource-group">Media & Data Visualization</div>
                <div class="resource-links">
                    <p><a href="https://www.theguardian.com/us-news/series/guns-and-lies">Guns and Lies, The Guardian</a></p>
                    <p><a href="https://fivethirtyeight.com/features/gun-deaths/">Gun Deaths in America, FiveThirtyEight</a></p>
                    <p><a href="https://www.washingtonpost.com/graphics/2018/investigations/black-homicides-arrests/">An Unequal Justice, Washington Post</a></p>
                </div>
            </div>
        </div>
    </div>
    <footer>
      <img id="footer-img" src="~static/ending-hero.svg" alt="">
      <div class="footer-links">
          <div class="link-container">
              <p class="footer-text"><a id="top-btn" href="#page-title">Back to top</a></p>
          </div>
          <div class="link-container">
              <a href="">Background & Methodology</a>
          </div>
          <div class="link-container">
               <a href="">Marisa Ruiz Asari</a>
          </div>
      </div>
    </footer>
  </div>
</template>

<script>

import heroImg from '~/static/hero2.png'
import navBar from '~/components/navBar.vue'
import stadium from '~/components/stadium.vue'
import seats from '~/components/stadium5.vue'
import LineChart from '~/components/LineChart'
import allChartDataJson from '~/static/allChartData.json'
import seatHighlight from '~/components/seat-highlight.vue'
import incarCompare from '~/components/incarc_compare.vue'
import allChartData from '~/static/one-chartdata.json'
import programData from '~/static/program_cities_geo.json'
import programMap from '~/components/program-map.vue'
import {gsap} from "gsap"
import d3 from "d3"


const chartColors = {
  dph: '#EF915F',  //#51B07B
  op: '#4472F2',  //#8682FF
  ss: '#53B77E',  //#E86BAD
  city: '#797979' //#74806A
};
                

export default {
  components: {
      navBar,
      LineChart,
      stadium,
      seats,
      seatHighlight,
      incarCompare,
      programMap
  },
  data() {
    return {
      scrollDirection: 'down',
      currStep: '1',
      subStep: null,
      stadiumCoords: null,
      candlesBot: 30,
      vOp: 1,
      stadiumOp: 0,
      height: 150,
      width: 200,
      seatsArranged: true,
      cd: allChartDataJson,
      raceChartData: allChartData[0].raceEth,
      raceChartDims: ['100', '200'],
      programData: programData.features,
      lineChartPlainOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        scales: {
          yAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: false,
              },
              ticks: {
                display: false,
                beginAtZero: true,
                max: 40,
                fontFamily: "'Merriweather', serif",
                fontColor: 'white'
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
              },
              ticks: {
                beginAtZero: false,
                display: false
              }
            }]
        }
      }
    }
  },
  watch: {
      currStep(newValue) {

          if (newValue == '1') {
              gsap.to('.candles-back', { duration: 2, backgroundColor: 'rgb(30, 38, 41)'})
          }

          if (newValue == '2') {
            gsap.to(this.$data, { duration: 0.8, candlesBot: 50 });
            gsap.to('.candles-back', { duration: 2, backgroundColor: 'rgb(62, 76, 85)'})

          } else {
              this.candlesBot = 30;
              this.vOp = 1;
          } 
          
          if (newValue == 'stadium video') {
            if(this.scrollDirection == 'down') {
                this.stadiumOp = 0;
                let tl = gsap.timeline()
                tl.to(this.$data, { delay: 3, duration: 0.2, stadiumOp: 1 })
                            // .to(this.$data, { delay: 0.7, duration: 0.4, vOp: 0.15 })
            }
 


            // let video = document.querySelector('#citi-field-video')
            // video.play()
          } else {

          } 
          
          if (newValue == "arrested") { 
            //   let arrestChart = document.querySelector("canvas")
            //   console.log(arrestChart)
            //   arrestChart.getDatasetMeta(2).hidden=true;
            //   arrestChart.update();
          } else {

          } 

          if (newValue == 'us incarceration intro') {
              if(this.scrollDirection == 'up') {
                let compareGrp = document.querySelector('.compare-grp')
                gsap.to(compareGrp, {duration: 1, opacity: 0.1})
              }
          }
          
          if (newValue == 'us incarceration') {
            let compareGrp = document.querySelector('.compare-grp')
            gsap.to(compareGrp, {duration: 1, opacity: 1})
            if (this.scrollDirection == 'up') {
                let usCompare = document.querySelector('.us-comparison')
                gsap.to(usCompare, {duration: 1, opacity: 0})
                let compareAllSvg = document.querySelector('#incarCompare')
                gsap.to(compareAllSvg, {duration: 1, width: '400vw'})
            }
                
          } else {

          } 
          
          if (newValue == 'homicide and incarceration') {
                let usCompare = document.querySelector('.us-comparison')
                gsap.to(usCompare, {duration: 1, opacity: 1})
                let compareAllSvg = document.querySelector('#incarCompare')
                gsap.to(compareAllSvg, {duration: 1, width: '95vw'})
          } else {
        
          }
      },
      subStep(newValue) {
          console.log(newValue)
          let stadiumSvg = document.querySelector('#stadium-points')
          let points = stadiumSvg.querySelectorAll('circle')

          let suicG = document.querySelector('#g-one')
          let suic = suicG.querySelectorAll('circle')

          let homG = stadiumSvg.querySelector('#g-three')
          let hom = homG.querySelectorAll('circle')

          let otherG = document.querySelector('#g-two')
          let other = otherG.querySelectorAll('circle')

          gsap.to('#hundredk-img', {duration: 0, opacity: 0.25, scaleX: 1, scaleY: 1})
          
          if (newValue == 'stadium video play') {
              if(this.scrollDirection == 'down') {
                let video = document.querySelector('#google-earth-video')
                video.play()
              }
          }

          if (newValue == 'seats suicides') {

              if (this.seatsArranged == false) {
                console.log('rearranging seats')
                this.rearrangeSeats()
               }

              gsap.to('#g-three', { delay: 0.2, duration: 0.4, opacity: 0.25, fill: '#6680C2' })
              gsap.to('#g-two', { delay: 0.2, duration: 0.4, opacity: 0.25, fill: '#63968C' })
              gsap.to('#g-one', { delay: 0.2, duration: 0.8, opacity: 1, scaleX: 1.01, scaleY: 1.01 })
              
              for(let point in suic) {
                  gsap.to(suic[point], {duration: 0.4, stroke: '#718CBC', strokeWidth: 3})
              }

              for(let point in hom) {
                  gsap.to(hom[point], {duration: 0.4, stroke: '#C66D6D', strokeWidth: 3})
              }

              for(let point in other) {
                  gsap.to(other[point], {duration: 0.4, stroke: '#989B9A', strokeWidth: 3})
              }

          } else if (newValue == 'seats homicides') {

              gsap.to('#g-two', { delay: 0.2, duration: 0.4, opacity: 0.25 })
              gsap.to('#g-one', { delay: 0.2, duration: 0.4, opacity: 0.25, scaleX: 1, scaleY: 1})
              gsap.to('#g-three', { delay: 0.2, duration: 0.8, opacity: 1, scaleX: 1.01, scaleY: 1.01 })
              if (this.seatsArranged == false) {
                console.log('rearranging seats')
                this.rearrangeSeats()
               }
          } else if (newValue == 'seats other') {

              if (this.seatsArranged == false) {
                console.log('rearranging seats')
                this.rearrangeSeats()
               }

              gsap.to('#g-two', { delay: 0.2, duration: 0.8, opacity: 1, scaleX: 1.01, scaleY: 1.01 })
              gsap.to('#g-one', { delay: 0.2, duration: 0.4, opacity: 0.25, scaleX: 1, scaleY: 1})
              gsap.to('#g-three', { delay: 0.2, duration: 0.4, opacity: 0.25, scaleX: 1, scaleY: 1})
              
          } else {
              gsap.to('#g-two', { delay: 0.2, duration: 0.4, opacity: 1, scaleX: 1, scaleY: 1 })
              gsap.to('#g-one', { delay: 0.2, duration: 0.4, opacity: 1, scaleX: 1, scaleY: 1})
              gsap.to('#g-three', { delay: 0.2, duration: 0.4, opacity: 1, scaleX: 1, scaleY: 1})
          }

          if (newValue == 'seats rearrange') {
                
                let vidHolder = document.querySelector(' #vid-holder')
                let video = document.querySelector('#google-earth-video')
                let vidCover = document.querySelector('#g-earth-cover')
                let stadPoints = document.querySelector('#stadium-points')

                gsap.to(vidHolder, {duration: 0, justifyContent: 'flex-start'})

                let pxPerDot = 0.70*((screen.height * screen.width)/points.length)
                console.log(pxPerDot)

                let sqRt = Math.sqrt(pxPerDot)
                console.log(sqRt)

                let dotsPerRow = screen.width/sqRt
                console.log(dotsPerRow)

                let rowCount = points.length/dotsPerRow
                console.log(rowCount)
                // gsap.to(stadPoints, {duration: 0, top: 0, left: 0})

                console.log(points.length)
                let cx = 0;
                let cy = 0;
                let currentLine = 1;

                let total = points.length
                let lines = Math.floor(rowCount)
                let perLine = Math.floor(dotsPerRow)
                // let perLine = Math.floor(points.length/lines) 

                for (let point in points) {
                    cx += Math.floor(sqRt);
                    if (point > perLine * currentLine) {
                        currentLine ++
                        cy += Math.floor(sqRt);
                        cx = 0;
                    }
                    gsap.to(points[point], {duration: 2, cx: cx, cy: cy, r: 0.5});
                }
                this.seatsArranged = false;
          } else if (newValue == 'flag') {
              this.stadiumOp = 0;

          } else if (newValue == 'rates') {
               gsap.to('#hundredk-img', {duration: 0, opacity: 0.25, scaleX: 1, scaleY: 1, y: 0})
          } else if (newValue == 'rates2') {
                gsap.to('#hundredk-img', {duration: 1, opacity: 1, scaleX: 1, scaleY: 1, y: 0})
          } else if (newValue == 'seatsHighlight') {
                gsap.to('#hundredk-img', {duration: 0.5, opacity: 1, scaleX: 0.3, scaleY: 0.3, y: 200})
          } else if (newValue == 'seatsHighlight2') {
                gsap.to('#hundredk-img', {duration: 0, opacity: 1, scaleX: 0.3, scaleY: 0.3, y: 200})
                let people2 = document.querySelectorAll('.row2')
                console.log(people2)
                for(let i=0; i<5; i++) {
                    gsap.from(people2[i], {delay: i/4, duration: 0.2, opacity: 0})
                }    
          }

          if (newValue == 'programs-static') {
            gsap.to('#back', {duration: 0.5, opacity: 0.4, pointerEvents: 'none'})
          } else if (newValue == 'programs-interactive') {
            gsap.to('#back', {duration: 0.5, opacity: 1, pointerEvents: 'auto'})
          }
      } 
  },
  methods: {
      lineChartOptionsLabels(chartTitle, yLabel, xLabel, legend) {
        let ldisplay;
        if (legend == 'no legend') {
            ldisplay = false
        } else {
            ldisplay = true
        };
        return {
        responsive: true,
        legend: {
          display: ldisplay,
          position: 'bottom',
          fontFamily: "'Merriweather', serif",
          fontColor: 'white'
        },
        title: {
          display: true,
          text: chartTitle,
          fontFamily: "'Merriweather', serif",
          fontColor: 'white'
        },
        scales: {
          yAxes: [{
              gridLines: {
                display: true
              },
              scaleLabel: {
                display: true,
                labelString: yLabel,
                fontFamily: "'Merriweather', serif",
                fontColor: 'white'
              },
              ticks: {
                beginAtZero: true,
                fontFamily: "'Merriweather', serif",
                fontColor: 'white'
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: xLabel,
                fontFamily: "'Merriweather', serif",
                fontColor: 'white'
              },
              ticks: {
                beginAtZero: true,
                fontFamily: "'Merriweather', serif",
                fontColor: 'white'
              }
            }]
        }
      }
      },
      setGraphicContent(event) {
          console.log(event.element)
          let step = event.element.getAttribute('data-step-no')
          let subStep = event.element.getAttribute('data-substep')
          console.log(step)
          this.currStep = step
          this.subStep = subStep
          this.scrollDirection = event.direction
      },
      resetContent(event) {
          console.log(event.direction)
          console.log(event.element)
      },
      rearrangeSeats() {
      let vidHolder = document.querySelector(' #vid-holder')
      gsap.to(vidHolder, {duration: 0, justifyContent: 'center'})
      let stadPoints = document.querySelector('#stadium-points')
      let positionedPoints = stadPoints.querySelectorAll('circle')

    //   gsap.to(stadPoints, {duration: 0, x: 0, y: 0, top: '295px', left: '720px', scaleX: 1.36, scaleY: 1.36, width: 1400, height: 900})

      for (let positionedPoint in positionedPoints) {
        gsap.to(positionedPoints[positionedPoint], {duration: 1, cx: '', cy: '', r: ''});
      }
      this.seatsArranged = true;
    }
  },
  directives: {
  animatePeople: {
    // directive definition
    inserted: function (el) {
      let people = document.querySelectorAll('.row1')
      for(let person in people ) {
        gsap.from(people[person], {delay: person/4, duration: 0.2, opacity: 0})
      }
    }
  }
}
}

if (process.client) {
  window.onscroll = function() {myFunction()};

  function myFunction() {
    // console.log('scrolling')
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 53.5;
    document.getElementById("progress-bar").style.height = scrolled + "%";
  }
}
</script>
