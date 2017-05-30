import {Question} from "./collection";

export default {
	create(item){
		return Question.create(item).exec()
	},
	update(item){
		return Question.update({id:item.id},{
			$set:{
				updatedAt:item.updatedAt,
				title:item.title,
				description:item.description,
				items:item.items,
				activity:item.activity
			}
		}).exec()
	},
	find(query={}){
		return Question.find(query).exec()
	},
	remove(id){
		return Question.remove({id:id}).exec()
	}
}