import require_condition from './condition';


export default function watchPropertyChange(target, property, cb) {
    require_condition(
      target != null &&
      typeof property === 'string' &&
      typeof cb === 'function', 'invalid arguments')
  
    let cache = null
    if (!target.__watch_cache){
      target.__watch_cache = {}
    }
    cache = target.__watch_cache
  
    require_condition(cache[property] == null, `duplicated watch on ${target} 's ${property}`)
    cache[property] = cb
  
    let origin = target[property]
  
    Object.defineProperty(target, property, {
      configurable: true,
  
      get() {
        return origin
      },
  
      set(value) {
        origin = value
        if (cache[property]){
          cache[property](origin)
        }
      }
    })
  
    return ()=>{
      if (target.__watch_cache && target.__watch_cache[property]){
        delete target.__watch_cache[property]
        delete target[property]
        target[property] = origin
      }
    }
  }