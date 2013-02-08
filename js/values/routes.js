angular.module('GoTTC')
.value('routeDirectory', [
	{name:'Yonge-University-Spadina Subway',uri:'yonge-university-spadina_subway'},
	{name:'Sheppard Subway',uri:'sheppard_subway'},
	{name:'Bloor-Danforth Subway',uri:'bloor-danforth_subway'},
	{name:'Scarborough RT',uri:'scarborough_rt'},
	{name:'5 Avenue Road',uri:'5_avenue_road'},
	{name:'6 Bay',uri:'6_bay'},
	{name:'7 Bathurst',uri:'7_bathurst'},
	{name:'8 Broadview',uri:'8_broadview'},
	{name:'9 Bellamy',uri:'9_bellamy'},
	{name:'10 Van Horne',uri:'10_van_horne'},
	{name:'11 Bayview',uri:'11_bayview'},
	{name:'12 Kingston Road',uri:'12_kingston_road'},
	{name:'14 Glencairn',uri:'14_glencairn'},
	{name:'15 Evans',uri:'15_evans'},
	{name:'16 McCowan',uri:'16_mccowan'},
	{name:'17 Birchmount',uri:'17_birchmount'},
	{name:'20 Cliffside',uri:'20_cliffside'},
	{name:'21 Brimley',uri:'21_brimley'},
	{name:'22 Coxwell',uri:'22_coxwell'},
	{name:'23 Dawes',uri:'23_dawes'},
	{name:'24 Victoria Park',uri:'24_victoria_park'},
	{name:'25 Don Mills',uri:'25_don_mills'},
	{name:'26 Dupont',uri:'26_dupont'},
	{name:'28 Davisville',uri:'28_davisville'},
	{name:'29 Dufferin',uri:'29_dufferin'},
	{name:'30 Lambton',uri:'30_lambton'},
	{name:'31 Greenwood',uri:'31_greenwood'},
	{name:'32 Eglinton West',uri:'32_eglinton_west'},
	{name:'33 Forest Hill',uri:'33_forest_hill'},
	{name:'34 Eglinton East',uri:'34_eglinton_east'},
	{name:'35 Jane',uri:'35_jane'},
	{name:'36 Finch West',uri:'36_finch_west'},
	{name:'37 Islington',uri:'37_islington'},
	{name:'38 Highland Creek',uri:'38_highland_creek'},
	{name:'39 Finch East',uri:'39_finch_east'},
	{name:'40 Junction',uri:'40_junction'},
	{name:'41 Keele',uri:'41_keele'},
	{name:'42 Cummer',uri:'42_cummer'},
	{name:'43 Kennedy',uri:'43_kennedy'},
	{name:'44 Kipling South',uri:'44_kipling_south'},
	{name:'45 Kipling',uri:'45_kipling'},
	{name:'46 Martin Grove',uri:'46_martin_grove'},
	{name:'47 Lansdowne',uri:'47_lansdowne'},
	{name:'48 Rathburn',uri:'48_rathburn'},
	{name:'49 Bloor West',uri:'49_bloor_west'},
	{name:'50 Burnhamthorpe',uri:'50_burnhamthorpe'},
	{name:'51 Leslie',uri:'51_leslie'},
	{name:'52 Lawrence West',uri:'52_lawrence_west'},
	{name:'53 Steeles East',uri:'53_steeles_east'},
	{name:'54 Lawrence East',uri:'54_lawrence_east'},
	{name:'55 Warren Park',uri:'55_warren_park'},
	{name:'56 Leaside',uri:'56_leaside'},
	{name:'57 Midland',uri:'57_midland'},
	{name:'58 Malton',uri:'58_malton'},
	{name:'59 Maple Leaf',uri:'59_maple_leaf'},
	{name:'60 Steeles West',uri:'60_steeles_west'},
	{name:'61 Avenue Road North',uri:'61_avenue_road_north'},
	{name:'62 Mortimer',uri:'62_mortimer'},
	{name:'63 Ossington',uri:'63_ossington'},
	{name:'64 Main',uri:'64_main'},
	{name:'65 Parliament',uri:'65_parliament'},
	{name:'66 Prince Edward',uri:'66_prince_edward'},
	{name:'67 Pharmacy',uri:'67_pharmacy'},
	{name:'68 Warden',uri:'68_warden'},
	{name:'69 Warden South',uri:'69_warden_south'},
	{name:'70 O Connor',uri:'70_o_connor'},
	{name:'71 Runnymede',uri:'71_runnymede'},
	{name:'72 Pape',uri:'72_pape'},
	{name:'73 Royal York',uri:'73_royal_york'},
	{name:'74 Mount Pleasant',uri:'74_mount_pleasant'},
	{name:'75 Sherbourne',uri:'75_sherbourne'},
	{name:'76 Royal York South',uri:'76_royal_york_south'},
	{name:'77 Swansea',uri:'77_swansea'},
	{name:'78 St Andrews',uri:'78_st_andrews'},
	{name:'79 Scarlett Road',uri:'79_scarlett_road'},
	{name:'80 Queensway',uri:'80_queensway'},
	{name:'81 Thorncliffe Park',uri:'81_thorncliffe_park'},
	{name:'82 Rosedale',uri:'82_rosedale'},
	{name:'83 Jones',uri:'83_jones'},
	{name:'84 Sheppard West',uri:'84_sheppard_west'},
	{name:'85 Sheppard East',uri:'85_sheppard_east'},
	{name:'86 Scarborough',uri:'86_scarborough'},
	{name:'87 Cosburn',uri:'87_cosburn'},
	{name:'88 South Leaside',uri:'88_south_leaside'},
	{name:'89 Weston',uri:'89_weston'},
	{name:'90 Vaughan',uri:'90_vaughan'},
	{name:'91 Woodbine',uri:'91_woodbine'},
	{name:'92 Woodbine South',uri:'92_woodbine_south'},
	{name:'94 Wellesley',uri:'94_wellesley'},
	{name:'95 York Mills',uri:'95_york_mills'},
	{name:'96 Wilson',uri:'96_wilson'},
	{name:'97 Yonge',uri:'97_yonge'},
	{name:'98 Willowdale-Senlac',uri:'98_willowdale-senlac'},
	{name:'99 Arrow Road',uri:'99_arrow_road'},
	{name:'100 Flemingdon Park',uri:'100_flemingdon_park'},
	{name:'101 Parc Downsview Park',uri:'101_parc_downsview_park'},
	{name:'102 Markham Road',uri:'102_markham_road'},
	{name:'103 Mount Pleasant North',uri:'103_mount_pleasant_north'},
	{name:'104 Faywood',uri:'104_faywood'},
	{name:'105 Dufferin North',uri:'105_dufferin_north'},
	{name:'106 York University',uri:'106_york_university'},
	{name:'107 Keele North',uri:'107_keele_north'},
	{name:'108 Downsview',uri:'108_downsview'},
	{name:'109 Ranee',uri:'109_ranee'},
	{name:'110 Islington South',uri:'110_islington_south'},
	{name:'111 East Mall',uri:'111_east_mall'},
	{name:'112 West Mall',uri:'112_west_mall'},
	{name:'113 Danforth',uri:'113_danforth'},
	{name:'115 Silver Hills',uri:'115_silver_hills'},
	{name:'116 Morningside',uri:'116_morningside'},
	{name:'117 Alness',uri:'117_alness'},
	{name:'120 Calvington',uri:'120_calvington'},
	{name:'122 Graydon Hall',uri:'122_graydon_hall'},
	{name:'123 Shorncliffe',uri:'123_shorncliffe'},
	{name:'124 Sunnybrook',uri:'124_sunnybrook'},
	{name:'125 Drewry',uri:'125_drewry'},
	{name:'126 Christie',uri:'126_christie'},
	{name:'127 Davenport',uri:'127_davenport'},
	{name:'129 Mccowan North',uri:'129_mccowan_north'},
	{name:'130 Middlefield',uri:'130_middlefield'},
	{name:'131 Nugget',uri:'131_nugget'},
	{name:'132 Milner',uri:'132_milner'},
	{name:'133 Neilson',uri:'133_neilson'},
	{name:'134 Progress',uri:'134_progress'},
	{name:'135 Gerrard',uri:'135_gerrard'},
	{name:'139 Finch-Don Mills',uri:'139_finch-don_mills'},
	{name:'141 Downtown-Mount Pleasant',uri:'141_downtown-mount_pleasant'},
	{name:'142 Downtown-Avenue',uri:'142_downtown-avenue'},
	{name:'143 Downtown-Beach',uri:'143_downtown-beach'},
	{name:'144 Downtown-Don Valley',uri:'144_downtown-don_valley'},
	{name:'160 Bathurst North',uri:'160_bathurst_north'},
	{name:'161 Rogers Road',uri:'161_rogers_road'},
	{name:'162 Lawrence-Donway',uri:'162_lawrence-donway'},
	{name:'165 Weston Road North',uri:'165_weston_road_north'},
	{name:'167 Pharmacy North',uri:'167_pharmacy_north'},
	{name:'168 Symington',uri:'168_symington'},
	{name:'169 Huntingwood',uri:'169_huntingwood'},
	{name:'171 Mt Dennis',uri:'171_mt_dennis'},
	{name:'172 Cherry Street',uri:'172_cherry_street'},
	{name:'190 Scarborough Centre Rocket',uri:'190_scarborough_centre_rocket'},
	{name:'191 Highway 27 Rocket',uri:'191_highway_27_rocket'},
	{name:'192 Airport Rocket',uri:'192_airport_rocket'},
	{name:'196 York University Rocket',uri:'196_york_university_rocket'},
	{name:'224 Victoria Park North',uri:'224_victoria_park_north'},
	{name:'300 Bloor-Danforth',uri:'300_bloor-danforth'},
	{name:'301 Queen',uri:'301_queen'},
	{name:'302 Danforth Road-Mccowan',uri:'302_danforth_road-mccowan'},
	{name:'303 Don Mills',uri:'303_don_mills'},
	{name:'305 Eglinton East',uri:'305_eglinton_east'},
	{name:'306 Carlton',uri:'306_carlton'},
	{name:'307 Eglinton West',uri:'307_eglinton_west'},
	{name:'308 Finch East',uri:'308_finch_east'},
	{name:'309 Finch West',uri:'309_finch_west'},
	{name:'310 Bathurst',uri:'310_bathurst'},
	{name:'311 Islington',uri:'311_islington'},
	{name:'312 St Clair',uri:'312_st_clair'},
	{name:'313 Jane',uri:'313_jane'},
	{name:'316 Ossington',uri:'316_ossington'},
	{name:'319 Wilson',uri:'319_wilson'},
	{name:'320 Yonge',uri:'320_yonge'},
	{name:'321 York Mills',uri:'321_york_mills'},
	{name:'322 Coxwell',uri:'322_coxwell'},
	{name:'324 Victoria Park',uri:'324_victoria_park'},
	{name:'329 Dufferin',uri:'329_dufferin'},
	{name:'352 Lawrence West',uri:'352_lawrence_west'},
	{name:'353 Steeles East',uri:'353_steeles_east'},
	{name:'354 Lawrence East',uri:'354_lawrence_east'},
	{name:'385 Sheppard East',uri:'385_sheppard_east'},
	{name:'400 Lawrence Manor',uri:'400_lawrence_manor'},
	{name:'402 Parkdale',uri:'402_parkdale'},
	{name:'403 South Don Mills',uri:'403_south_don_mills'},
	{name:'404 East York',uri:'404_east_york'},
	{name:'405 Etobicoke',uri:'405_etobicoke'},
	{name:'501 Queen',uri:'501_queen'},
	{name:'502 Downtowner',uri:'502_downtowner'},
	{name:'503 Kingston Road',uri:'503_kingston_road'},
	{name:'504 King',uri:'504_king'},
	{name:'505 Dundas',uri:'505_dundas'},
	{name:'506 Carlton',uri:'506_carlton'},
	{name:'508 Lake Shore',uri:'508_lake_shore'},
	{name:'509 Harbourfront',uri:'509_harbourfront'},
	{name:'510 Spadina',uri:'510_spadina'},
	{name:'511 Bathurst',uri:'511_bathurst'},
	{name:'512 St Clair',uri:'512_st_clair'}
]);