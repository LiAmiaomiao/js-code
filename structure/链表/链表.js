function LinkedList(){
    function Node(element){
        this.element = element;
        this.next = null;
    }
    this.head = null;
    this.length = 0;
    //通过对一个方法append判断就可以知道是否设置了prototype???
    if((typeof this.append !== 'function')&&(typeof this.append !== 'string')){
        //添加元素
        LinkedList.prototype.append = function(element){
            var node = new Node(element);
            var current;
            if(this.head === null){
                this.head = node;
            }else{
                current = this.head;
                while(current.next !== null){
                    current = current.next;
                }
                current.next = node;
            }
            this.length++;
        }
        //插入节点，成功返回true，失败false
        LinkedList.prototype.insert = function(position,element){
            if(position>-1&&position<this.length){
                var current = this.head;
                var previous;
                var index = 0;
                var node = new Node(element);
                if(position === 0){
                    node.next = current;
                    this.head = node;
                }else{
                    //?
                    while(index++ < position){
                        previous = current;
                        current = current.next;
                    }
                    node.next = current;
                    previous.next = node;
                }
                this.length++;
                return true;
            }else{
                return false;
            }
        }
        //根据位置删除指定元素，成功返回true，失败false
        LinkedList.prototype.removeAt = function(position){
            if(position > -1 && position<this.length){
                var current = this.head;
                var previous = null;
                var index = 0;
                if(position === 0){
                    this.head = current.next;
                }else{
                    while(index++ < position){
                        previous = current;
                        current = current.next;
                    }
                    previous.next = current.next;
                }
                this.length--;
                return current.element;
            }else{
                return null;
            }
        };
        //根据元素删除指定元素，成功返回true，失败返回false
        LinkedList.prototype.remove = function(element){
            var index = this.indexOf(element);
            return this.removeAt(index);
        }
        //返回给定元素的索引，如果没有则返回-1
        LinkedList.prototype.indexOf = function(element){
            var current = this.head;
            var index = 0;
            while(current){
                if(current.element === element){
                    return index;
                }
                index++;
                current = current.next;
            }
            return -1;
        }
        LinkedList.prototype.isEmpty = function(){
            return this.length === 0
        }
        LinkedList.prototype.size = function(){
            return this.length;
        }
        LinkedList.prototype.toString = function(){
            var string = '';
            var current = this.head;
            while(current){
                string += current.element;
                current = current.next;
            }
            return string;
        };
        LinkedList.prototype.getHead = function(){
            return this.head;
        }
    }
}