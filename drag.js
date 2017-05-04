(function(){
	window.Drag = function(id,littleSide){
		//获取盒模型对象
		var o = document.getElementById(id);
		var isCreate = false;

		o.onclick = function(ev){

			var oEvent = ev || event;
			oEvent.cancelBubble = true;

			readyDrag();
			//alert(getElByClassName('drag_public').length);
		};

		//拖拽标识的边长
		var lside = littleSide || 10;

		//点击其他位置，隐藏拖拽标识
		document.onclick = function(){

			fnDisplay('none');
		};

		/*
		 * 创建拖拽标识
		 * @author D
		 * @date   2014-5-19
		 *
		 */
		function readyDrag(){

			if(!isCreate){
				//左上
				createEl('drag_public',lside,'lt','nw-resize');
				//上中
				createEl('drag_public',lside,'tc','n-resize');
				//右上
				createEl('drag_public',lside,'rt','ne-resize');
				//左中
				createEl('drag_public',lside,'lc','w-resize');
				//右中
				createEl('drag_public',lside,'rc','e-resize');
				//左下
				createEl('drag_public',lside,'lb','sw-resize');
				//下中
				createEl('drag_public',lside,'bc','s-resize');
				//右下
				createEl('drag_public',lside,'rb','se-resize');

				isCreate = !isCreate;
			}
			else{
				isCreate && fnDisplay('block');
			};
		};

		/*
		 * 创建拖拽标识(div)并设置位置
		 * @author D
		 * @date   2014-5-18
		 * @param  {string} _class  拖拽标识的公共样式
		 *		   {number} _side   拽标识的边长
		 *		   {number} _pos    拖拽标识的位置
		 *		   {string} _cursor 各个位置拖拽标识的鼠标样式
		 *
		 */
		function createEl(_class,_side,_pos,_cursor){

			var oDiv = document.createElement('div');
			oDiv.className = _class;
			oDiv.style.width = oDiv.style.height = _side + 'px';

			switch(_pos){
				case 'lt':
					oDiv.style.left = oDiv.style.top = -_side + 'px';
					break;
				case 'lc':
					oDiv.style.left = -_side + 'px';
					oDiv.style.top = '50%';
					oDiv.style.marginTop = -parseInt(_side/2) + 'px';
					break;
				case 'lb':
					oDiv.style.left = oDiv.style.bottom = -_side + 'px';
					break;
				case 'tc':
					oDiv.style.left = '50%';
					oDiv.style.top = -_side + 'px';
					oDiv.style.marginLeft = -(_side/2) + 'px';
					break;
				case 'bc':
					oDiv.style.left = '50%';
					oDiv.style.bottom = -_side + 'px';
					oDiv.style.marginLeft = -(_side/2) + 'px';
					break;
				case 'rt':
					oDiv.style.top = oDiv.style.right = -_side + 'px';
					break;
				case 'rc':
					oDiv.style.top = '50%';
					oDiv.style.marginTop = -(_side/2) + 'px';
					oDiv.style.right = -_side + 'px';
					break;
				case 'rb':
					oDiv.style.right = oDiv.style.bottom = -_side + 'px';
					break;
			};
			addEvent(oDiv,_pos);
			oDiv.style.cursor = _cursor;
			o.appendChild(oDiv);
		};

		/*
		 * 给每个拖拽标识增加拖拽事件
		 * @author D
		 * @date   2014-5-19
		 * @param  {object} obj 拖拽标识对象
		 *
		 */
		function addEvent(obj,_pos){

			obj.onmousedown = function(ev){

				var oEvent = ev || event;
				//鼠标按下时的位置坐标
				var clientX = oEvent.clientX;
				var clientY = oEvent.clientY;
				//
				var oldW = o.offsetWidth;
				var oldH = o.offsetHeight;
				var oldL = o.offsetLeft;
				var oldT = o.offsetTop;

				document.onmousemove = function(ev){

					var oEvent = ev || event;
					//拖拽改变的距离
					var changeX = oEvent.clientX - clientX;
					var changeY = oEvent.clientY - clientY;

					switch(_pos) {
						case 'lt':
							//o.style.width = oldW - changeX + 'px';
							o.style.height = oldH - changeY + 'px';
							//o.style.left = oldL + changeX + 'px';
							o.style.top = oldT + changeY + 'px';
							//break;
						case 'lc':
							o.style.width = oldW - changeX + 'px';
							o.style.left = oldL + changeX + 'px';
							break;
						case 'lb':
							o.style.width = oldW - changeX + 'px';
							o.style.height = oldH + changeY + 'px';
							o.style.left = oldL + changeX + 'px';
							break;
						case 'tc':
							o.style.height = oldH - changeY + 'px';
							o.style.top = oldT + changeY + 'px';
							break;
						case 'rb':
							o.style.width = oldW + changeX + 'px';
							//o.style.height = oldH + changeY + 'px';
							//break;
						case 'bc':
							o.style.height = oldH + changeY + 'px';
							break;
						case 'rt':
							//o.style.width = oldW + changeX + 'px';
							o.style.height = oldH - changeY + 'px';
							o.style.top = oldT + changeY + 'px';
							//break;
						case 'rc':
							o.style.width = oldW + changeX + 'px';
							break;
					};
				};

				document.onmouseup = function ()
				{
					document.onmousemove = document.onmouseup = null;
				};
			};
		};

		/*
		 * 获取为指定class的元素
		 * @author D
		 * @date   2014-5-19
		 * @param  {string} _cName class名称
		 *
		 */
		function getElByClassName(_cName){

			if(document.getElementsByClassName){
				return document.getElementsByClassName(_cName);
			};

			var aAll = o.getElementsByTagName('*');
			var aTemp = [];
			for(var i=0,len=aAll.length;i<len;i++){
				if(aAll[i].className === _cName){
					aTemp.push(aAll[i]);
				}
			};

			return aTemp;
		};

		/*
		 * 设置拖拽标识显示与隐藏
		 * @author D
		 * @date   2014-5-19
		 * @param  {string} v display属性值：none或block
		 *
		 */
		function fnDisplay(v){

			var aItems = getElByClassName('drag_public');

			for(var i=0,len=aItems.length;i<len;i++){
				aItems[i].style.display = v;
			};
		};
	}
})();
