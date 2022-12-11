# PODS

### Comandos básicos

```
kubectl run server --image=nginx:alpine
kubectl get pods
kubectl get po
kubectl port-forward <nombre del pod> <puerto host>:<puerto contenedor>
kubectl get po <nombre del pod>
kubectl get po <nombre del pod> -o yaml
kubectl get po <nombre del pod> -o json
kubectl describe po <nombre del pod>
kubectl apply -f <nombre del manifiesto>
kubectl apply -f <nombre del manifiesto> -f <nombre del otro manifiesto>
kubectl delete pod <nombre del pod>
kubectl delete -f <nombre del manifiesto>
kubectl exec -it web -- sh
kubectl exec -it <nombre del pod> -c contenedor1 -- sh
```

### Listas pods con sus etiquetas

```
kubectl get po --show-labels
```

### Listar pods por determinada etiqueta y valor

```
kubectl get po --show-labels -l env=dev
```
