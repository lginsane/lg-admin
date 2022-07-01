<script lang="ts" setup>
  const route = useRoute()
  const router = useRouter()
  const path = route.query.path as string
  router.replace({ path })
</script>
