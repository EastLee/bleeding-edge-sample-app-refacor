import {fromJS} from "immutable";

export default function(data){
	if(!data||data.length==0) return {};
	var obj = {};
	for(var item of data){
		delete item._id;
		var id = item.id;
		obj[id] = fromJS(item)
	}
	return obj;
}