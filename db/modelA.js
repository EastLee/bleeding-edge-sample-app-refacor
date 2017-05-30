import {Answer} from "./collection";

export default {
	create(item){
		return Answer.remove({id:item.id}).exec().then(function(res){
			if(res.result.ok){
				Answer.create(item).exec()
			}
		})
	},
	remove(id){
		return Answer.remove({id:id}).exec()
	},
	find(query={}){
		return Answer.find(query).exec()
	}
}