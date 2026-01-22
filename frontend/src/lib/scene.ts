import * as THREE from 'three'

export function initScene(canvas: HTMLCanvasElement): () => void {
  console.log('--- 3D Init: Canvas found ---')
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()
  const cam = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  cam.position.z = 12

  const wire = (c: number, o: number) => new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: o })
  const solid = (c: number, o: number) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: o })

  // High Visibility Colors & Opacities
  const main = new THREE.Mesh(new THREE.IcosahedronGeometry(3.8, 2), wire(0xd4c8a8, 0.22)) // 22% Wireframe
  const fill = new THREE.Mesh(new THREE.IcosahedronGeometry(3.75, 2), solid(0xd93800, 0.12)) // 12% Fill
  scene.add(main, fill)

  const r1 = new THREE.Mesh(new THREE.TorusGeometry(5.5, 0.01, 4, 120), solid(0xd4c8a8, 0.12))
  r1.rotation.x = Math.PI / 2.4
  const r2 = new THREE.Mesh(new THREE.TorusGeometry(7, 0.008, 4, 150), solid(0xd93800, 0.10))
  r2.rotation.x = Math.PI / 1.5
  r2.rotation.z = 0.5
  scene.add(r1, r2)

  type Def = [THREE.BufferGeometry, [number, number, number], number, number]
  const accents: THREE.Mesh[] = ([
    [new THREE.OctahedronGeometry(0.4, 0), [5, 2, -2], 0xd4c8a8, 0.20],
    [new THREE.OctahedronGeometry(0.3, 0), [-5, -1.5, -3], 0xd4c8a8, 0.18],
    [new THREE.TetrahedronGeometry(0.35, 0), [3, -4, -1.5], 0xd93800, 0.18],
    [new THREE.TetrahedronGeometry(0.28, 0), [-4, 3, -2], 0xd93800, 0.15],
    [new THREE.OctahedronGeometry(0.5, 0), [0, 5, -3], 0xc8980a, 0.16],
  ] as Def[]).map(([geo, pos, col, op]) => {
    const m = new THREE.Mesh(geo, wire(col, op))
    m.position.set(...pos)
    m.userData.baseY = pos[1]
    scene.add(m)
    return m
  })

  const N = 350
  const pp = new Float32Array(N * 3)
  const pc = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    pp[i * 3] = (Math.random() - 0.5) * 26
    pp[i * 3 + 1] = (Math.random() - 0.5) * 16
    pp[i * 3 + 2] = (Math.random() - 0.5) * 8 - 3
    const t = Math.random()
    if (t < 0.65) { pc[i * 3] = 0.83; pc[i * 3 + 1] = 0.78; pc[i * 3 + 2] = 0.67 }
    else if (t < 0.88) { pc[i * 3] = 0.85; pc[i * 3 + 1] = 0.22; pc[i * 3 + 2] = 0 }
    else { pc[i * 3] = 0.78; pc[i * 3 + 1] = 0.60; pc[i * 3 + 2] = 0.04 }
  }
  const ptGeo = new THREE.BufferGeometry()
  ptGeo.setAttribute('position', new THREE.BufferAttribute(pp, 3))
  ptGeo.setAttribute('color', new THREE.BufferAttribute(pc, 3))
  scene.add(new THREE.Points(ptGeo, new THREE.PointsMaterial({ size: 0.016, vertexColors: true, transparent: true, opacity: 0.5 })))

  let mx = 0, my = 0
  const onMove = (e: MouseEvent) => {
    mx = e.clientX / window.innerWidth - 0.5
    my = e.clientY / window.innerHeight - 0.5
  }
  const onResize = () => {
    cam.aspect = window.innerWidth / window.innerHeight
    cam.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  window.addEventListener('mousemove', onMove)
  window.addEventListener('resize', onResize)

  let t = 0, raf: number
  const tick = () => {
    raf = requestAnimationFrame(tick)
    if (t === 0) console.log('--- 3D Loop: Running ---')
    t += 0.003
    main.rotation.x = t * 0.07 + my * 0.12
    main.rotation.y = t * 0.10 + mx * 0.18
    fill.rotation.x = main.rotation.x
    fill.rotation.y = main.rotation.y
    r1.rotation.z = t * 0.03
    r2.rotation.y = t * 0.04
    accents.forEach((m, i) => {
      m.rotation.x += 0.007 + i * 0.002
      m.rotation.y += 0.006 + i * 0.0015
      m.position.y = m.userData.baseY + Math.sin(t * 0.6 + i * 1.1) * 0.35
    })
    cam.position.x += (mx * 1.0 - cam.position.x) * 0.035
    cam.position.y += (-my * 0.7 - cam.position.y) * 0.035
    renderer.render(scene, cam)
  }
  tick()

  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', onResize)
    renderer.dispose()
  }
}
